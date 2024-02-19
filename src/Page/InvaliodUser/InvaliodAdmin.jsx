const InvalidAdmin = () => {
    return (
      <div className="text-red-400 text-3xl w-full  ">
       <div className=" mx-auto items-center justify-center  ">
       <svg
       className="mx-auto block p-8"
          height="200"
          style={{ overflow: "visible", enableBackground: "new 0 0 32 32" }}
          viewBox="0 0 32 32"
          width="200"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g>
            <g id="Error_1_">
              <g id="Error">
                <circle cx="16" cy="16" id="BG" r="16" fill="#D72828" />
                <path
                  d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z"
                  id="Exclamatory_x5F_Sign"
                  fill="#E6E6E6"
                />
              </g>
            </g>
          </g>
        </svg>
       </div>
        Access blocked, request invalid
      </div>
    );
  };
  
  export default InvalidAdmin;
  