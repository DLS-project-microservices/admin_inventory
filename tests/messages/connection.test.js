import connectToRabbitMQ from '../../messages/connection';
import amqp from 'amqplib';

jest.mock('amqplib');

describe('Tests for functions that publish product events', () => {
        // Mocking the Channel returned by createChannel and also the assertExchange method of Channel
        const channelMock = jest.fn().mockImplementation(() => {
            return {
                assertExchange: jest.fn()
            }    
        })
        // Replacing amqp.connect with a mock function
        amqp.connect.mockResolvedValue({
            createChannel: channelMock
         });

    test('Testing that only 1 connection is established and reused', async () => {
        for (let i = 0; i < 5; i++) {
            await connectToRabbitMQ();
        }
        
        expect(amqp.connect).toHaveBeenCalledTimes(1);
    });

});
