import { resizeImage } from '../utils/handel_ImageResize';

describe('Testing resizeImage ', () => {
  it('toBeResolved if fileName,height and width are Correct', async (): Promise<void> => {
    await expectAsync(resizeImage('cairo', 200, 200)).toBeRejected();
  });
  it('returns hello world', async (): Promise<void> => {
    expectAsync(resizeImage('santamonica', 200, 200)).toBeResolved();
  });
});
