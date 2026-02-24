import { handlePage } from "@/features/transaction/transactionSlice";
import type { AppDispatch, RootState } from "@/Store";
import { useDispatch, useSelector } from "react-redux";

const AdminBtnContainer = () => {
  const { numOfPage, page } = useSelector(
    (store: RootState) => store.transaction,
  );
  const dispatch = useDispatch<AppDispatch>();
  const nextPage = () => {
    let nxPage = page + 1;
    if (nxPage > numOfPage) {
      nxPage = 1;
    }
    dispatch(handlePage(nxPage));
  };
  const prevPage = () => {
    let pvPage = page - 1;
    if (pvPage < 1) {
      pvPage = numOfPage;
    }
    dispatch(handlePage(pvPage));
  };
  const pageNumber = Array.from({ length: numOfPage }, (_, index) => {
    return index + 1;
  });
  console.log(page);
  return (
    <div
      className={`${numOfPage < 1 ? "hidden" : "block"} flex gap-x-4 justify-self-end mt-8`}
    >
      <button
        onClick={() => {
          prevPage();
        }}
      >
        prev
      </button>
      {pageNumber.map((pageBtn) => {
        const activePage = page === pageBtn;
        return (
          <button
            key={pageBtn}
            className={`${activePage ? "bg-red-600" : ""}bg-gray-500 grid place-items-center w-4 rounded-full`}
          >
            {pageBtn}
          </button>
        );
      })}
      <button onClick={() => nextPage()}>next</button>
    </div>
  );
};

export default AdminBtnContainer;
