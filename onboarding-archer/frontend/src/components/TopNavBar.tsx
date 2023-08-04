import Icon from '@/components/lib/Icon.tsx';
import { Link } from 'react-router-dom';
import InspectModeToggle from '@/components/InspectModeToggle.tsx';

export default function TopNavBar() {
  return (
    <nav className="bg-primary3 px-18 py-6 w-full">
      <div className="container flex justify-end relative">
        <Link
          to="/"
          className="flex justify-center items-center absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]"
        >
          <Icon icon="archer_logo" />
          <div className="text-primary1 text-[16px] leading-[100%] font-bold uppercase tracking-[12.16px] ml-3">
            Archer
          </div>
        </Link>
        <InspectModeToggle className={''} />
      </div>
    </nav>
  );
}
