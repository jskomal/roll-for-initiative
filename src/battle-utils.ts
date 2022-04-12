export const rollDice = (numDice: number, diceSize: number): number => {
  let sum = 0
  for (let i = 0; i < numDice; i++) {
    sum += Math.floor(Math.random() * diceSize) + 1
  }
  return sum
}

export const rollToHit = (attackModifier: number): number => {
  return rollDice(1, 20) + attackModifier
}

export const checkForHit = (rollToHitResult: number, targetAC: number): boolean => {
  return rollToHitResult >= targetAC ? true : false
}

export const rollDamage = (attackDiceNumber: number, attackDiceSize: number): number => {
  return rollDice(attackDiceNumber, attackDiceSize)
}

export const doDamage = (totalDamage: number, targetHP: number): number => {
  return targetHP - totalDamage
}

export const healingWord = (totalHealing: number, targetHP: number): number => {
  return targetHP + totalHealing
}
