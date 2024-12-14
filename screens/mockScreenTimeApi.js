let mockScreenTime = {};

const generateRandomScreenTime = (userId) => {
  // Generate a random screen time between 0 and 180 minutes
  return Math.floor(Math.random() * 181);
};

export const initializeMockData = (userIds) => {
  userIds.forEach((userId) => {
    mockScreenTime[userId] = generateRandomScreenTime(userId);
  });
};

export const getScreenTime = async (userId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!(userId in mockScreenTime)) {
    mockScreenTime[userId] = generateRandomScreenTime(userId);
  }

  return mockScreenTime[userId];
};

export const updateScreenTime = async (userId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Increase screen time by a random amount (0-30 minutes)
  const increase = Math.floor(Math.random() * 31);
  mockScreenTime[userId] = Math.min(
    (mockScreenTime[userId] || 0) + increase,
    180
  );

  return mockScreenTime[userId];
};
