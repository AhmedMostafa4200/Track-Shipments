import { Link, useLocation } from "react-router-dom";

import Spinner from "../../components/common/Spinner.js/index";
import Error from "./../../components/icons/Error";
import ReportProb from "../../components/icons/ReportProb";
import CheckMark from "../../components/icons/CheckMark";

import useFetchShipDetails from "../../hooks/apis/useFetchShipDetails";

import { convertDate } from "../../utils/convertDate";

const ShipDetails = () => {
  const { state } = useLocation();

  const { isLoading: isShipDetailsLoading, data: shipDetails } =
    useFetchShipDetails(state?.shipId);
  return (
    <>
      <div>
        {shipDetails ? (
          <div className="p-4">
            <div className="border border-gray rounded">
              <div className="flex flex-col sm:flex-row gap-x-2 gap-y-4 items-center justify-between p-6 text-sm font-medium text-gray">
                <div className="flex flex-col gap-y-2 items-center sm:items-start">
                  <span>رقم الشحنه {shipDetails.TrackingNumber}</span>
                  <span
                    className={`text-lg font-bold ${
                      shipDetails.CurrentStatus.state === "DELIVERED"
                        ? "text-green"
                        : ""
                    }`}
                  >
                    حالة الشحنة
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 items-center sm:items-start">
                  <span>اخر تحديث</span>
                  <span className="text-lg font-bold text-dark">
                    {convertDate(shipDetails.CurrentStatus.timestamp)}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 items-center sm:items-start">
                  <span>اسم التاجر</span>
                  <span className="text-lg font-bold text-dark">SOUQ.COM</span>
                </div>
                <div className="flex flex-col gap-y-2 items-center sm:items-start">
                  <span>موعد التسليم خلال</span>
                  <span className="text-lg font-bold text-dark">
                    {shipDetails.PromisedDate
                      ? new Date(shipDetails.PromisedDate).toLocaleDateString(
                          "ar-EG-u-nu-latn",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          }
                        )
                      : "---"}
                  </span>
                </div>
              </div>
              <div className="h-0.5 bg-gray"></div>

              <div className="text-sm font-bold flex items-center p-6 pb-16 mt-24 mb-8 extra-sm:mt-10 extra-sm:mb-0 sm:mt-0 sm:pt-0">
                <div className="border border-gray rounded-full h-6 w-6 relative flex flex-col-reverse sm:flex-col items-start">
                  <div className="w-full flex justify-center items-center">
                    <CheckMark />
                  </div>
                  <div className="w-20 extra-sm:w-max my-2">
                    تم إنشاء الشحنة
                  </div>
                </div>
                <div
                  className={`w-1/3 h-1.5 -mx-px ${
                    shipDetails.CurrentStatus.state === "DELIVERED"
                      ? "bg-green"
                      : shipDetails.CurrentStatus.state ===
                        "DELIVERED_TO_SENDER"
                      ? "bg-onhold"
                      : shipDetails.CurrentStatus.state === "NOT_DELIVERED"
                      ? "bg-red"
                      : "bg-gray"
                  }`}
                ></div>
                <div className="border border-gray rounded-full h-6 w-6 relative flex flex-col items-center">
                  <div className="w-full flex justify-center items-center">
                    <CheckMark />
                  </div>
                  <div className="w-20 extra-sm:w-max my-2">
                    تم استلام الشحنة من التاجر
                  </div>
                </div>
                <div
                  className={`w-1/3 h-1.5 -mx-px ${
                    shipDetails.CurrentStatus.state === "DELIVERED"
                      ? "bg-green"
                      : shipDetails.CurrentStatus.state ===
                        "DELIVERED_TO_SENDER"
                      ? "bg-onhold"
                      : shipDetails.CurrentStatus.state === "NOT_DELIVERED"
                      ? "bg-red"
                      : "bg-gray"
                  }`}
                ></div>
                <div className="border border-gray rounded-full h-6 w-6 relative flex flex-col-reverse sm:flex-col items-center">
                  <div className="w-full flex justify-center items-center">
                    <CheckMark />
                  </div>
                  <div className="w-40 extra-sm:w-max text-center my-2">
                    <p>الشحنة خرجت للتسليم</p>
                    {shipDetails.CurrentStatus.state ===
                      "DELIVERED_TO_SENDER" &&
                      shipDetails.TransitEvents.map((event) => (
                        <p className="text-onhold">{event.reason}</p>
                      ))}
                    {shipDetails.CurrentStatus.state === "NOT_DELIVERED" &&
                      shipDetails.TransitEvents.map((event) => (
                        <p className="text-red">{event.reason}</p>
                      ))}
                  </div>
                </div>
                <div
                  className={`w-1/3 h-1.5 -mx-px ${
                    shipDetails.CurrentStatus.state === "DELIVERED"
                      ? "bg-green"
                      : "bg-gray"
                  }`}
                ></div>
                <div className="border border-gray rounded-full h-6 w-6 relative flex flex-col items-center sm:items-start">
                  <div className="w-full flex justify-center items-center">
                    <CheckMark />
                  </div>
                  <div className="relative sm:left-175% w-20 extra-sm:w-max my-2">
                    تم التسليم
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10">
              <div className="max-w-full overflow-auto col-span-3 sm:col-span-2">
                <table className="w-full table-fixed">
                  <caption className="text-dark font-bold text-sm text-right mb-3 sm:mb-6">
                    تفاصيل الشخنة
                  </caption>

                  <thead>
                    <tr className="text-right bg-gray bg-opacity-20 text-sm font-semibold text-gray border border-gray">
                      <th className="px-6 py-4">الفرع</th>
                      <th className="px-6 py-4">التاريخ</th>
                      <th className="px-6 py-4">الوقت</th>
                      <th className="px-6 py-4" colSpan="2">
                        تفاصيل
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipDetails.TransitEvents.map((event) => (
                      <tr className="text-dark font-medium text-sm border border-gray">
                        <td className="px-6 py-4">{event.hub ?? "---"}</td>
                        <td className="px-6 py-4">
                          {new Date(event.timestamp).toLocaleDateString(
                            "ar-EG-u-nu-latn"
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(event.timestamp).toLocaleDateString(
                            "ar-EG-u-nu-latn",
                            {
                              weekday: "long",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4" colSpan="2">
                          {event.reason ?? "---"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-span-3 sm:col-span-1 flex flex-col">
                <label className="text-dark font-bold text-sm mb-3 sm:mb-6">
                  عنوان التسليم
                </label>
                <p className="border border-gray px-4 py-6 mb-6 rounded bg-gray bg-opacity-20 text-sm font-semibold text-dark text-opacity-60">
                  عنوان التسليم عنوان التسليم عنوان التسليم عنوان التسليم عنوان
                  التسليم عنوان التسليم
                </p>
                <div className="grid grid-cols-3 border border-gray rounded p-4">
                  <div className="col-span-1 text-center">
                    <ReportProb />
                  </div>
                  <div className="col-span-2 flex flex-col justify-center items-center gap-y-4 px-4 text-base text-dark font-semibold">
                    <p>هل يوجد مشكلة في شحنتك؟!</p>
                    <button
                      type="button"
                      className="bg-red py-2 w-full rounded-xl text-center text-sm text-white"
                    >
                      إبلاغ عن مشكلة
                    </button>
                  </div>
                </div>
                <Link
                  to="all-shipments"
                  className="text-center p-2 mt-6 bg-onhold rounded-md text-white"
                >
                  الرئيسية
                </Link>
              </div>
            </div>
          </div>
        ) : isShipDetailsLoading ? (
          <div className="h-screen flex justify-center items-center">
            <div className="h-10 w-10">
              <Spinner />
            </div>
          </div>
        ) : (
          <div className="h-screen flex flex-col justify-center items-center">
            <div className="h-10 w-10">
              <Error />
            </div>
            <p>Oops... Some thing went wrong!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ShipDetails;
