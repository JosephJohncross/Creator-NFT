import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../components/ui/table"
import { MintedNFT } from "../../hooks/use-mintedNFT"
   
   
  export function NFTTable({data}: {data: MintedNFT[]}) {
    return (
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Token Id</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Token URI</TableHead>
            <TableHead className="">Reward</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((tnx) => (
            <TableRow key={tnx.tokenId} className="py-5">
              <TableCell className="font-medium py-7 text-center">{tnx.tokenId}</TableCell>
              <TableCell>{tnx.creator}</TableCell>
              <TableCell>
                    <div className="">
                        <span className="">{tnx.tokenURI.slice(0,13)}...{tnx.tokenURI.slice(-20)}</span>
                    </div>
              </TableCell>
              <TableCell className="">{`10CTN`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Minted</TableCell>
            <TableCell className="text-right">{data?.reduce((a,b, c) => {return c+10})}</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    )
  }