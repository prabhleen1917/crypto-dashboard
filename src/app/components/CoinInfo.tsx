// import axios from "axios";
// import { useEffect, useState } from "react";


// interface Coin {
//   id: string;
// }

// interface CoinInfoProps {
//   coin: Coin;
// }

// type HistoricData = number[][];

// const CoinInfo: React.FC<CoinInfoProps> = ({ coin }) => {
//   const [historicData, setHistoricData] = useState<HistoricData | null>(null);
//   const [days, setDays] = useState<number>(1);
//   const { currency } = CryptoState();
//   const [flag, setFlag] = useState<boolean>(false);

//   const fetchHistoricData = async () => {
//     const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
//     setFlag(true);
//     setHistoricData(data.prices);
//   };

//   useEffect(() => {
//     fetchHistoricData();
//   }, [days, currency, coin.id]);

//   return (
//     <div className="flex justify-center items-center h-3/4">
//       <div className="flex flex-col items-center justify-center border border-[#2fffe5] rounded-lg p-10 w-full max-w-md mt-5">
//         {!historicData || flag === false ? (
//           <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
//         ) : (
//           <>
//             <Line
//               data={{
//                 labels: historicData.map((coin) => {
//                   let date = new Date(coin[0]);
//                   let time = date.getHours() > 12
//                     ? `${date.getHours() - 12}:${date.getMinutes()} PM`
//                     : `${date.getHours()}:${date.getMinutes()} AM`;
//                   return days === 1 ? time : date.toLocaleDateString();
//                 }),
//                 datasets: [
//                   {
//                     data: historicData.map((coin) => coin[1]),
//                     label: `Price ( Past ${days} Days ) in ${currency}`,
//                     borderColor: "#EEBC1D",
//                   },
//                 ],
//               }}
//               options={{
//                 elements: {
//                   point: {
//                     radius: 1,
//                   },
//                 },
//               }}
//             />
//             <div className="flex mt-5 justify-around w-full">
//               {chartDays.map((day) => (
//                 <SelectButton
//                   key={day.value}
//                   onClick={() => {
//                     setDays(day.value);
//                     setFlag(false);
//                   }}
//                   selected={day.value === days}
//                 >
//                   {day.label}
//                 </SelectButton>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CoinInfo;

// // This function would need to be updated based on your API call
// export async function getServerSideProps(context) {
//   const { id } = context.params as { id: string };
//   const data = await fetchHistoricalData(id); // You would define this fetch function
//   return {
//     props: {
//       coin: data,
//     },
//   };
// }
