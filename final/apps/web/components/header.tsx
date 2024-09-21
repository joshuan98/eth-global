import { Button } from "@/components/ui/button";
import logo from "@/public/logo.jpg";
import Image from "next/image";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
// @ts-ignore
import truncateMiddle from "truncate-middle";
import { Skeleton } from "@/components/ui/skeleton";
import { Chain } from "./chain";
import { Separator } from "./ui/separator";
import { useRouter, usePathname } from "next/navigation";  // Import usePathname to get current path

export interface HeaderProps {
  loading: boolean;
  wallet?: string;
  onConnectWallet: () => void;
  balance?: string;
  balanceLoading: boolean;
  blockHeight?: string;
  ghi?: string;
}

export default function Header({
  loading,
  wallet,
  onConnectWallet,
  balance,
  balanceLoading,
  blockHeight,
  ghi
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();  // Get current path

  // Determine if the current path is for students or universities
  const isStudentPath = pathname.includes("students");
  const isUniversityPath = pathname.includes("universities");

  const handleNavigateSuccess = () => {
    if (isStudentPath) {
      router.push("/students/success");
    } else if (isUniversityPath) {
      router.push("/universities/success");
    }
  };

  const handleNavigateProfile = () => {
    if (isStudentPath) {
      router.push("/students/profile");
    } else if (isUniversityPath) {
      router.push("/universities/profile");
    }
  };

  return (
    <div className="flex items-center justify-between border-b p-2 shadow-sm">
      <div className="container flex">
        <div className="flex basis-6/12 items-center justify-start">
          <Button
            className="p-0 bg-transparent border-none hover:bg-transparent"
            onClick={handleNavigateSuccess}
          >
            <Image
              className="h-8 w-auto object-contain"
              src={logo}
              alt={"ZkScholar logo"}
            />
          </Button>
          <Separator className="mx-4 h-8" orientation={"vertical"} />
          <div className="flex grow">
            <Chain height={blockHeight} />
          </div>
        </div>
        <div className="flex basis-6/12 flex-row items-center justify-end">
          {/* balance */}
          {wallet && (
            <div className="mr-4 flex shrink flex-col items-end justify-center">
              <div>
                <p className="text-xs">Your balance</p>
              </div>
              <div className="w-32 pt-0.5 text-right">
                {balanceLoading && balance === undefined ? (
                  <Skeleton className="h-4 w-full" />
                ) : (
                  <p className="text-xs font-bold">{balance} USDC</p>
                )}
              </div>
            </div>
          )}
          {/* profile */}
          <Button className="mx-4" onClick={handleNavigateProfile}>
            <div className="flex items-center justify-center">
              <AccountBoxIcon />
            </div>
          </Button>
          {/* connect wallet */}
          <Button loading={loading} className="w-44" onClick={onConnectWallet}>
            <div>
              {wallet ? truncateMiddle(wallet, 7, 7, "...") : "Connect wallet"}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
