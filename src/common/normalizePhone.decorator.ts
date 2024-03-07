import { Transform } from 'class-transformer';

export function NormalizePhone() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.replace(/[^\d+]/g, '').replace(/(^\d)(.+)/, '+$1$2');
    }
    return value;
  });
}
