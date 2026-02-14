const { User } = require('../models');
const { generateReferralCode } = require('../utils/generateReferralCode');

async function backfillReferralCodes() {
  const users = await User.findAll();

  for (const user of users) {
    if (!user.referralCode) {
      user.referralCode = generateReferralCode(user.name);
      await user.save();
    }
  }

  console.log('Backfilled referral codes!');
}

backfillReferralCodes();
