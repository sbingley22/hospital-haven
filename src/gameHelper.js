import * as THREE from 'three'

const vec3a = new THREE.Vector3()
const vec3b = new THREE.Vector3()
const vec3c = new THREE.Vector3()
const quat = new THREE.Quaternion()

export const isUnskippableAnimation = (anim) => {
  if (!anim || !anim.current) return

  const a = anim.current
  if (a === "Pistol Fire") return true
  if (a === "Take Damage") return true
  if (a === "Die") return true

  return false
}

export const playAudio = (src, volume=1, mute=false) => {
  if (mute) return
  const audio = new Audio(src)
  audio.volume = volume
  audio.play()
}

export const rotateToVec = (group, dx, dy, rotSpeed=0.1) => {
  if (!group) return

  // Calculate target rotation
  const direction = vec3b.set(dx, 0, dy).normalize()
  const angle = Math.atan2(direction.x, direction.z)

  // Create quaternions for current and target rotations
  const currentQuaternion = group.quaternion.clone()
  const targetQuaternion = quat.setFromAxisAngle(vec3c.set(0, 1, 0), angle)

  // Interpolate rotation using slerp
  currentQuaternion.slerp(targetQuaternion, rotSpeed)
  group.quaternion.copy(currentQuaternion)
}

const camYOffset = 4
const camZOffset = 3
export const updateCamera = (group, camera) => {
  if (!group) return
  const focalpoint = vec3a.copy(group.current.position)
  const zoom = 1

  let x = focalpoint.x
  let y = focalpoint.y + camYOffset + zoom
  let z = focalpoint.z + camZOffset + zoom
  if (focalpoint.x > 1) {
    x = 1
  }
  else if (focalpoint.x < -1) {
    x = -1
  }
  if (focalpoint.z > 5) {
    y = 0 + camYOffset + zoom
    z = 5 + camZOffset + zoom
  }
  else if (focalpoint.z < -1) {
    y = 0 + camYOffset + zoom
    z = -1 + camZOffset + zoom
  }

  // camera.position.x = focalpoint.x
  // camera.position.y = focalpoint.y + camYOffset + zoom
  // camera.position.z = focalpoint.z + camZOffset + zoom

  camera.position.x = x
  camera.position.y = y
  camera.position.z = z
}


// ---------------------------------------------------------------------
// Player Functions

export const updateHeldInputs = (heldInputs, inputs) => {
  Object.keys(heldInputs.current).forEach((inputName) => {
    if (inputs.keyboard[inputName] || inputs.gamepad[inputName]) heldInputs.current.interact = true
    else heldInputs.current.interact = false
  })
}

export const playerMovement = (group, inputs, anim, transition, options, baseSpeed, speedMultiplier, delta ) => {
  if (!group.current) return
  transition.current = "Idle B"

  let dx = 0
  let dy = 0

  // keyboard
  if (inputs.keyboard.forward) dy = -1
  else if (inputs.keyboard.backward) dy = 1
  if (inputs.keyboard.left) dx = -1
  else if (inputs.keyboard.right) dx = 1

  // Normalise horizontal movement
  if (dx && dy) {
    dx *= 0.7
    dy *= 0.7
  }

  // gamepad
  const gpmx = inputs.gamepad.moveX
  const gpmy = inputs.gamepad.moveY
  const moveDeadZone = 0.3
  if (options.useController) {
    if (Math.abs(gpmx) > moveDeadZone) dx = gpmx
    if (Math.abs(gpmy) > moveDeadZone) dy = gpmy * -1
  }

  const moveSpeed = baseSpeed * speedMultiplier.current
  let speed = moveSpeed * delta
  let movementAnim = "Walking B"
  if (anim.current === "Pistol Fire") speed *= 0.0
  if (moveSpeed > 4) movementAnim = "Jogging"

  // move
  const targetPosition = vec3a.set(group.current.position.x + dx * speed, group.current.position.y, group.current.position.z + dy * speed)

  if (dx || dy) {
    // moving
    if (!["Pistol Fire"].includes(anim.current)) {
      rotateToVec(group.current, dx, dy)
    }

    transition.current = movementAnim
    if (!isUnskippableAnimation(anim)) {
      anim.current = movementAnim
    }
  }
  else {
    // stationary
    transition.current = "Idle B"
    if (!isUnskippableAnimation(anim)) {
      anim.current = "Idle B"
    }
  }

  // console.log(targetPosition.length())
  // if (targetPosition.length() > 5.9) return
  if (targetPosition.x > 5.5) targetPosition.x = 5.5
  else if (targetPosition.x < -5.5) targetPosition.x = -5.5
  if (targetPosition.z > 6.5) targetPosition.z = 6.5
  else if (targetPosition.z < -6.5) targetPosition.z = -6.5

  group.current.position.x = targetPosition.x
  group.current.position.y = targetPosition.y
  group.current.position.z = targetPosition.z
}

const findNearestEnemy = (origin, enemyGroup) => {
  if (!enemyGroup || !enemyGroup.current) return null

  let dist = 1000
  let closest = -1
  enemyGroup.current.children.forEach((en, index) => {
    if (en.health <= 0) return
    if (!en.flagInZone) return

    const distance = origin.distanceTo(en.position)
    if (distance < dist) {
      dist = distance
      closest = index
    }
  })

  if (closest === -1) return null
  return enemyGroup.current.children[closest]
}

export const playerAttack = (group, anim, inputs, enemyGroup) => {
  if (!group) return
  if (!group.current) return
  if (!inputs.keyboard) return

  if (!inputs.keyboard.interact && !inputs.gamepad.interact) return
  if (inputs.heldInputs.interact) return

  if (!isUnskippableAnimation(anim)) {
    // start attack 
    anim.current = "Pistol Fire"

    // shoot nearest enemy
    const nearestEnemy = findNearestEnemy(group.current.position, enemyGroup)
    // console.log(nearestEnemy)
    if (nearestEnemy.flagInZone) {
      const dx = nearestEnemy.position.x - group.current.position.x
      const dy = nearestEnemy.position.z - group.current.position.z
      rotateToVec(group.current, dx, dy, 1.0)

      nearestEnemy.flagDmg = {damage: 25}
    }
  }
}

export const playerFlags = (group, anim, forceAnim) => {
  if (!group) return
  if (!group.current) return

  let updateStatus = []

  // Damage Flag
  if (group.current.flagDmg) {
    const flag = group.current.flagDmg
    const distance = 1.5

    if (flag.range > distance) {
      updateStatus.push("health")
      let dmg = flag.damage

      group.current.health -= dmg
      if (anim.current === "cqc dmg") forceAnim.current = true
      anim.current = "cqc dmg"
    }

    group.current.flagDmg = null
  }

  return updateStatus
}

export const zombieAi = (group, anim, player, speed) => {
  if (!group || !group.current || !player || !player.current) return;

  const zombie = group.current;
  const playerPos = player.current.position;
  const zombiePos = zombie.position;

  // Calculate direction vector from zombie to player
  const direction = vec3a.subVectors(playerPos, zombiePos).normalize();
  
  // Calculate distance to the player
  const distance = zombiePos.distanceTo(playerPos);

  if (distance > 0.8) {
    // Move towards the player
    let moveSpeed = speed 
    if (anim.current === "Take Damage") moveSpeed *= 0.1

    zombie.position.x += direction.x * moveSpeed;
    zombie.position.z += direction.z * moveSpeed;

    // Rotate to face the player
    const angle = Math.atan2(direction.x, direction.z);
    const targetQuaternion = quat.setFromAxisAngle(vec3b.set(0, 1, 0), angle);
    zombie.quaternion.slerp(targetQuaternion, 0.1); // Adjust rotation speed as needed

    // Play walking animation if not already playing
    if (!isUnskippableAnimation(anim)) {
      anim.current = "Staggering";
    }
  } else {
    // Stop and play attack animation
    if (!isUnskippableAnimation(anim)) {
      anim.current = "Attack Swipe";
    }
  }
};


export const zombieFlags = (group, anim, forceAnim) => {
  if (!group) return
  if (!group.current) return

  let updateStatus = []

  // Damage Flag
  if (group.current.flagDmg) {
    const flag = group.current.flagDmg

    if (group.current.flagInZone) {
      updateStatus.push("health")
      let dmg = flag.damage

      group.current.health -= dmg
      if (anim.current === "Take Damage") forceAnim.current = true
      anim.current = "Take Damage"
      // console.log("Taking dmg: ", flag.damage)
    }

    group.current.flagDmg = null
  }

  return updateStatus
}