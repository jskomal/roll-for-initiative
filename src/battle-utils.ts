export const rollDice = (numDice: number, diceSize: number): number => {
  let sum = 0
  for (let i = 0; i < numDice; i++) {
    sum += Math.floor(Math.random() * diceSize) + 1
  }
  return sum
}

export const rollToHit = (toHit: number): number => {
  return rollDice(1, 20) + toHit
}

export const checkForHit = (rollToHitResult: number, targetAC: number): boolean => {
  return rollToHitResult >= targetAC ? true : false
}

export const rollDamage = (DMGInput: string[]): number => {
  let dice = parseDMGInput(DMGInput)
  return rollDice(dice[0], dice[1]) + dice[2]
}

export const doDamage = (totalDamage: number, targetHP: number): number => {
  return targetHP - totalDamage
}

const parseDMGInput = (DMGInput: string[]): number[] => {
  let split1 = DMGInput[0].split('d')
  let split2 = split1[1].split('+')
  let numOfDice = parseInt(split1[0])
  let sizeOfDice = parseInt(split2[0])
  let DMGBonus = parseInt(split2[1])
  return [numOfDice, sizeOfDice, DMGBonus || 0]
}
