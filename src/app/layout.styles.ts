import cntl from 'cntl';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

const styles = {
  body: cntl`${plusJakartaSans.className} flex flex-col justify-between min-h-screen`,
  content: cntl`relative grid flex-grow md:grid-cols-6`,
  main: cntl`w-full px-4 pt-24 pb-4 overflow-auto md:col-span-4 lg:col-span-5`,
  footer: cntl`p-2 dark:bg-neutral-900 bg-neutral-300`
};

export { styles };
