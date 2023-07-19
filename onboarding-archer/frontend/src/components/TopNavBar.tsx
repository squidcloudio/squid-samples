import Icon from '@/components/lib/Icon.tsx';
import { Link } from 'react-router-dom';

export default function TopNavBar() {
  return (
    <nav className="bg-primary3 px-18 py-6 flex justify-center">
      <Link to="/" className="flex justify-center items-center">
        <Icon icon="archer_logo" />
        <div className="text-primary1 text-[16px] leading-[100%] font-bold uppercase tracking-[12.16px] ml-3">
          Archer
        </div>
      </Link>
    </nav>
  );
}
