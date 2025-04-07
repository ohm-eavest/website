import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from './fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <Image
        src="/eavest-logo.svg"
        width={200}
        height={145}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
        />
      <p className="text-[44px]">Cabinet de conseil en produits structurésAcme</p>
    </div>
  );
}
