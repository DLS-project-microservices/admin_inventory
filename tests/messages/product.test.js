import * as connection from '../../messages/connection.js'
import { publishProductEvent } from '../../messages/product.js'

describe('Tests for functions that publishes product events', () => {
    // spying on connection function and implementing a mock function instead
    const connectionSpy = jest.spyOn(connection, 'default');

    // mocking the publish method from the channel object
    const publishMock = jest.fn().mockImplementation(() => {})
        connectionSpy.mockImplementation(async () => {
            return {
                channel: {
                    publish: publishMock
                },
                exchange: 'test exchange'
            }
        });
    const testMessage = {
            status: 'deleted',
            product: {}
        }
    
    
    afterEach(() => {
        jest.clearAllMocks();
    }, 20000)
    
    test('Should call channel.publish() with the right arguments', async () => {
        await publishProductEvent(testMessage.product, testMessage.status);
    
        // testing that the mocked publish method was called with the testMessage variable
        expect(publishMock.mock.calls[0])
            .toStrictEqual([
                "test exchange",
                "product change",
                Buffer.from(JSON.stringify(testMessage))]);
    })
    
    test('Throw exception when missing parameters', async() => {
        await expect(publishProductEvent(testMessage.product)).rejects.toThrow();
        await expect(publishProductEvent(undefined, testMessage.status)).rejects.toThrow();
    })

})

