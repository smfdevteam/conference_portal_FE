import { Divider } from "@nextui-org/react";
import { useId } from "react";

const Lyrics = ({ hymn_lyrics }) => {
  const renderid = useId();
  const { chorus, title, verses } = hymn_lyrics;
  return (
    <div className="h-fit">
      <h2 className="text-center font-bold text-3xl">{title}</h2>
      {chorus && (
        <div className="text-center">
          <p className="font-bold text-2xl my-3">القرار</p>
          {chorus.map((ch) => (
            <p key={renderid}>
              {ch.split("\n").map((ch1) => (
                <p key={renderid}>{ch1}</p>
              ))}
            </p>
          ))}
        </div>
      )}
      {verses.length > 0 && (
        <>
          <p className="font-bold text-2xl my-3 text-center">الكلمات</p>
          <div className="text-center">
            {verses.map((stanza, stanzaIndex) => (
              <div key={stanzaIndex} className="stanza shadow-md rounded-lg">
                <p className="font-bold text-2xl text-purple-600">
                  {stanzaIndex + 1}
                </p>
                {stanza.map((verse, verseIndex) => (
                  <div key={verseIndex} className="verse">
                    {verse.split("\n").map((line, lineIndex) => (
                      <p key={lineIndex}>{line}</p>
                    ))}
                  </div>
                ))}
                <Divider className="my-4" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Lyrics;
