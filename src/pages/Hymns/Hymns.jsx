import React, { useEffect, useState } from "react";
import SmartSearch from "../../Components/SmartSearch/SmartSearch";

export default function Hymns() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hymnDetails, setHymnDetails] = useState();

  // Function to handle user input
  const handleInputChange = (event) => {
    console.log("event====>", event.target.value);
    setSearchQuery(event.target.value);
  };

  // Function to fetch search results based on searchQuery
  const fetchSearchResults = () => {
    setSearchResults(() => {
      const results = JSON.parse(localStorage.getItem("hymns")).filter((item) =>
        item.title.startsWith(searchQuery)
      );
      return results;
    });
  };

  const getHymnDetails = (indexOfHymn) => {
    setSearchResults([]);
    setSearchQuery("");
    setHymnDetails(() => {
      const result = searchResults.filter(
        (item, index) => index == indexOfHymn
      );
      console.log("indexOfHymn ====>", indexOfHymn);
      console.log("result ====>", result);
      return result;
    });
  };

  const fetchHymns = async () => {
    if (!localStorage.getItem("hymns")) {
      try {
        // Your API call to fetch search results based on searchQuery
        const response = await fetch(`${apiKey}/hymns`);
        console.log("response", response);
        const data = await response.json();
        console.log("=====data", data);
        localStorage.setItem("hymns", JSON.stringify(data.hymns));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchHymns();
  }, []);

  useEffect(() => {
    // Fetch search results only if searchQuery is not empty
    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  // Function to fetch search results based on searchQuery

  return (
    <>
      <div className="text-center">
        <p className="text-small text-foreground-600 font-semibold">
          عندنا حوالى اكتر من ٩٠٠٠ ترنيمة ممكن تشوفهم من غير ما يكون عندك انترنت
        </p>
        <p className="text-tiny text-red-400 font-medium">
          بس عشان العدد كبير، ممكن البحث ياخد وقت شوية
        </p>
      </div>

      <div className="my-2">
        <SmartSearch
          searchQuery={searchQuery}
          handleInputChange={handleInputChange}
        />
        {searchResults.length > 0 ? (
          <>
            <ul className="text-right bg-white rounded-lg shadow-md p-2 mt-1 max-h-[300px] overflow-y-scroll">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  onClick={() => getHymnDetails(index)}
                  className="p-2 text-foreground-600 text-small hover:bg-foreground-100 transition duration-300 ease-in-out rounded-md"
                >
                  {result.title}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}
      </div>

      {hymnDetails ? (
        <>
          <div className="text-center">
            {hymnDetails[0].chorus ? (
              <>
                <h2 className="text-foreground-900 font-bold my-2">القرار</h2>
                <div>
                  {hymnDetails[0].chorus.map((item, chorusIndex) => {
                    if (Array.isArray(item)) {
                      return item.map((line, index) => (
                        <p key={index} className="text-foreground-500 p-1">
                          {line}
                        </p>
                      ));
                    } else {
                      return (
                        <p
                          key={chorusIndex}
                          className="text-foreground-500 p-1"
                        >
                          {item}
                        </p>
                      );
                    }
                  })}
                </div>
              </>
            ) : (
              <></>
            )}
            <h2 className="text-foreground-900 font-bold my-2">الكلمات</h2>
            <div>
              {hymnDetails[0].verses.map((item, index) => {
                if (Array.isArray(item)) {
                  return item.map((line, index) => (
                    <p key={index} className="text-foreground-500 p-1">
                      {line}
                    </p>
                  ));
                } else {
                  return (
                    <p key={index} className="text-foreground-500 p-1">
                      {item}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
