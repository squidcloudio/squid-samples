import Icon from '@/components/lib/Icon';
import InspectModeToggle from '@/components/InspectModeToggle';

export default function TopNavBar() {
  return (
    <nav className="bg-primary3 px-18 py-6 w-full">
      <div className="container flex justify-end relative">
        <a
          href="/"
          className="flex justify-center items-center absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]"
        >
          <Icon icon="archer_logo" />
          <div className="text-primary1 text leading-[100%] font-bold uppercase tracking-[12.16px] ml-3">
            Archer
          </div>
        </a>
        <InspectModeToggle className={''} />
      </div>
    </nav>
  );
}
