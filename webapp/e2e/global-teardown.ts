import { teardown } from 'jest-dev-server';

module.exports = async () => {
    await teardown();
};