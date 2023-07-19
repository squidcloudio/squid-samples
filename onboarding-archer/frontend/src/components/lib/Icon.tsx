import { Icons } from '@/utils/icons.ts';

type PropTypes = {
  icon: string;
  className?: string;
};
export default function Icon({ icon, className }: PropTypes) {
  const paths = icon.split('.');
  let Comp = Icons[paths[0]];
  for (let i = 1; i < paths.length; i++) {
    Comp = Comp[paths[i]];
  }
  if (!Comp) {
    console.error(`Missing icon: ${icon}`);
    return null;
  }
  return <Comp className={className} />;
}
