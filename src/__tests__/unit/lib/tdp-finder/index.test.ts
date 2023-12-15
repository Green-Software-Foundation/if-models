import {describe, expect, jest, test} from '@jest/globals';
import {TdpFinderModel} from '../../../../lib';

jest.setTimeout(30000);

describe('tdp-finder:configure test', () => {
  test('initialize and test', async () => {
    const model = await new TdpFinderModel().configure({});
    expect(model).toBeInstanceOf(TdpFinderModel);
    await expect(
      model.execute([
        {
          timestamp: '2023-11-02T10:35:31.820Z',
          duration: 3600,
          'physical-processor': 'AMD 3020e',
        },
      ])
    ).resolves.toStrictEqual([
      {
        timestamp: '2023-11-02T10:35:31.820Z',
        duration: 3600,
        'physical-processor': 'AMD 3020e',
        'thermal-design-power': 6.0,
      },
    ]);
    await expect(
      model.execute([
        {
          timestamp: '2023-11-02T10:35:31.820Z',
          duration: 3600,
        },
      ])
    ).rejects.toThrow();
    await expect(
      model.execute([
        {
          timestamp: '2023-11-02T10:35:31.820Z',
          duration: 3600,
          'physical-processor': 'Intel Xeon E5-2676 v3',
        },
      ])
    ).resolves.toStrictEqual([
      {
        timestamp: '2023-11-02T10:35:31.820Z',
        duration: 3600,
        'physical-processor': 'Intel Xeon E5-2676 v3',
        'thermal-design-power': 120.0,
      },
    ]);
    await expect(
      model.execute([
        {
          timestamp: '2023-11-02T10:35:31.820Z',
          duration: 3600,
          'physical-processor': 'Intel Xeon Platinum 8175M,AMD A8-9600',
        },
      ])
    ).resolves.toStrictEqual([
      {
        timestamp: '2023-11-02T10:35:31.820Z',
        duration: 3600,
        'physical-processor': 'Intel Xeon Platinum 8175M,AMD A8-9600',
        'thermal-design-power': 240.0,
      },
    ]);
    await expect(
      model.execute([
        {
          timestamp: '2023-11-02T10:35:31.820Z',
          duration: 3600,
          'physical-processor': 'Intel Xeon Platinum 8175M,AMD A8-9600f',
        },
      ])
    ).rejects.toThrowError();
    await expect(
      model.execute([
        {
          timestamp: '2023-11-02T10:35:31.820Z',
          duration: 3600,
          'physical-processor': 'AMD A8-9600',
        },
      ])
    ).resolves.toStrictEqual([
      {
        timestamp: '2023-11-02T10:35:31.820Z',
        duration: 3600,
        'physical-processor': 'AMD A8-9600',
        'thermal-design-power': 65,
      },
    ]);
    await expect(
      model.execute([
        {
          timestamp: '2023-11-02T10:35:31.820Z',
          duration: 3600,
          'physical-processor': 'AMD 3020ef',
        },
      ])
    ).rejects.toThrowError();
  });
});
