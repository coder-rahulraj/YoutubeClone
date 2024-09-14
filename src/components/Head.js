import React, { useEffect } from "react";
import { useState } from "react";
import youtbelogo from "../assest/youtubelogo1.png";
import { FaUser } from "react-icons/fa";
import HambergerMenu from "../assest/hambergermenu.png";
// import { CgSearch } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constant";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {

  //commenting this because search functionality is not working due to serach api expired
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);


  const dispatch = useDispatch();

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   if (searchCache[searchQuery]) {
    //     setSuggestions(searchCache[searchQuery]);
    //   } else {
    //     getSearchSuggestions();
    //   }
    // }, 200);

    getSearchSuggestions();
    // return () => {
    //   clearTimeout(timer);
    // };
  }, [searchQuery]);
  // console.log(suggestions.items.snippet.title);
  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    console.log(json);
    setSuggestions(json[1]);
    // console.log(suggestions);

    // update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };
// console.log(suggestions);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col p-3 m-1">
      <div className="flex col-span-1">
        <img
          src={HambergerMenu}
          alt="menu"
          className="h-8 cursor-pointer"
          onClick={() => toggleMenuHandler()}
        />

        <a href="/">
          <img
            className="h-8 mx-2 cursor-pointer"
            src={youtbelogo}
            alt="youtube"
            width={160}
            height={42}
            loading="lazy"
          />
        </a>
      </div>

      <div className=" col-span-10 px-10 items-center justify-between">
        <div>
          <input
            placeholder="Search"
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
            Search
          </button>
        </div>
        
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions?.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className=" col-span-1">
        <FaUser className="h-10" />
      </div>
    </div>
  );
};

export default Head;
