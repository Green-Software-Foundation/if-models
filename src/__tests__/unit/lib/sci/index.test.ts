import {describe, expect, jest, test} from '@jest/globals';
import {SciModel} from '../../../../lib';

jest.setTimeout(30000);

describe('sci:configure test', () => {
    test('initialize and test', async () => {
        const model = await new SciModel().configure({
            'functional-unit-time': 'minutes',
            'functional-unit': 'users',
            'functional-unit-duration': 1,
        });
        expect(model).toBeInstanceOf(SciModel);
        await expect(
            model.execute([
                {
                    'timestamp': '2021-01-01T00:00:00Z',

                    'operational-carbon': 0.02,
                    'embodied-carbon': 5,
                    users: 100,
                    duration: 1,
                },
            ])
        ).resolves.toStrictEqual([
            {
                'timestamp': '2021-01-01T00:00:00Z',

                'operational-carbon': 0.02,
                'embodied-carbon': 5,
                users: 100,
                duration: 1,
                sci: 3.012,
            },
        ]);
        await expect(
            model.execute([
                {
                    'timestamp': '2021-01-01T00:00:00Z',
                    'operational-carbon': 20,
                    'embodied-carbon': 0.005,
                    users: 1000,
                    duration: 1,
                },
            ])
        ).resolves.toStrictEqual([
            {
                'timestamp': '2021-01-01T00:00:00Z',
                'operational-carbon': 20,
                'embodied-carbon': 0.005,
                users: 1000,
                duration: 1,
                sci: 1.2003,
            },
        ]);
    });
    test('initialize and test: vary input duration ', async () => {
        const model = await new SciModel().configure({
            'functional-unit-time': 'days',
            'functional-unit': '',
            'functional-unit-duration': 1,
        });
        expect(model).toBeInstanceOf(SciModel);
        await expect(
            model.execute([
                {
                    'timestamp': '2021-01-01T00:00:00Z',
                    'operational-carbon': 0.2,
                    'embodied-carbon': 0.05,
                    duration: 100,
                },
            ])
        ).resolves.toStrictEqual([
            {
                'timestamp': '2021-01-01T00:00:00Z',
                'operational-carbon': 0.2,
                'embodied-carbon': 0.05,
                duration: 100,
                sci: 216,
            },
        ]);
        await expect(
            model.execute([
                {
                    'timestamp': '2021-01-01T00:00:00Z',
                    'operational-carbon': 0.002,
                    'embodied-carbon': 0.0005,
                    duration: 2,
                },
            ])
        ).resolves.toStrictEqual([
            {
              'timestamp': '2021-01-01T00:00:00Z',
                'operational-carbon': 0.002,
                'embodied-carbon': 0.0005,
                duration: 2,
                sci: 108,
            },
        ]);
    });
    test('initialize and test: vary functional-unit-duration', async () => {
        const model = await new SciModel().configure({
            'functional-unit-time': 'days',
            'functional-unit': '',
            'functional-unit-duration': 2,
        });
        expect(model).toBeInstanceOf(SciModel);
        await expect(
            model.execute([
                {
                    'timestamp': '2021-01-01T00:00:00Z',
                    'operational-carbon': 0.002,
                    'embodied-carbon': 0.0005,
                    duration: 1,
                },
            ])
        ).resolves.toStrictEqual([
            {
                'timestamp': '2021-01-01T00:00:00Z',
                'operational-carbon': 0.002,
                'embodied-carbon': 0.0005,
                duration: 1,
                sci: 432,
            },
        ]);
    });
});
