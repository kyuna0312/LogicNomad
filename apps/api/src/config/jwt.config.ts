/**
 * JWT configuration
 */

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'logicnomad-secret-key-change-in-production',
  expiresIn: '7d', // Token expires in 7 days
};
