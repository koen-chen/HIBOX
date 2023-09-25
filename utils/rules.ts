import dayjs from 'dayjs'

export const rules = {
  emailChecker: (val: string) => {
    const pattern = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    return pattern.test(val)
  },

  dateOfBirthChecker: (val: string) => {
    return dayjs(val).isBefore(dayjs(), 'year')
  }
}