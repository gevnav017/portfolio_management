export function ccyFormat(num) {
  return (
    <>
      $
      {`${parseFloat(num).toLocaleString("us-EN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`}
    </>
  );
}
 