import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import PropTypes from 'prop-types'

function Button({ text }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
  }, []);

  return (
    <button
      className={`bg-[#0B8021] text-white py-2 px-4 w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] transition-all font-zenkaku font-medium text-[16px] rounded flex group ${
        isTouchDevice ? "" : "hover:bg-[#006102]"
      } `}
      type="submit"
    >
      <p className="flex-1 w-full text-left">{text}</p>
      <ArrowRightIcon className="h-6 w-6 mr-5 group-hover:mr-0 transition-all" />
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired
}

export default Button;
