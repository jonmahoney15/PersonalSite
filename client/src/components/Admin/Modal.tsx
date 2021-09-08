import {useState, ReactNode} from "react";

interface IModalProps {
    Title: string;
    ButtonTitle: string;
    ChildComponent?: ReactNode;
}

const Modal = (props: IModalProps) => {
    const [showModal, setShowModal] = useState(false);
    const reload = () => window.location.reload();

    return (
        <>
          <button
            className="px-6 py-3 m-5 mb-1 mr-1 text-sm font-bold text-white uppercase bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-lg focus:outline-none ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
              {props.ButtonTitle}
          </button>
          {showModal ? (
            <>
              <div
                className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
              >
                <div className="relative w-auto max-w-3xl mx-auto my-6">
                  <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                      <h3 className="text-3xl font-semibold">
                        {props.Title} 
                      </h3>
                      <button
                        className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    <div className="relative flex-auto p-6">
                      {props.ChildComponent}   
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                      <button
                        className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase outline-none background-transparent focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          reload();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            </>
          ) : null}
        </>
    );
}

export default Modal;
