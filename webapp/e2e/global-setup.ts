import { setup } from 'jest-dev-server';

module.exports = async () => {
    await setup([

        {
            command: "npm --prefix ../. start",
            launchTimeout: 60000,
            debug: true,
            port: 3000
        }]);
};