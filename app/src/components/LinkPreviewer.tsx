import { ReactNode, useEffect, useState } from "react";
import { CardData } from "../types/CardProps";
import { Card } from "./Card";
// import linkPreviewGenerator from "link-preview-generator";

const DEFAULT_CARD_DATA: CardData = {
  image: undefined,
  title: "",
  text: ""
};

export function LinkPreviewer(
  props: {
    link: string;
    children: ReactNode;
  },
): JSX.Element {
  const [isShown, setIsShown] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cardData, setcardData] = useState(DEFAULT_CARD_DATA)
  useEffect(() => {
    // that is async
    logPreviewData();
    async function logPreviewData() {
      // rickroll
      const str = 'https://www.youtube.com/watch?v=sXwaRjU7Tj0';
      // const previewData = await linkPreviewGenerator(
      //   str,
      // );
      // console.log(previewData);
    }
    return () => { };
  }, [isShown]);
  useEffect(() => {
    
    // todo here change the cardData
    return () => {
      
    }
  }, [isLoaded])

  return (
    <>
      <p>{props.link}</p>
      <a
        href={props.link}
        className="link-with-preview"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <span>{props.children}</span>
        {isShown && (
          <Card
            image={cardData.image}
            title={cardData.title}
            text={cardData.text}
          />
        )}
      </a>
    </>
  );
}
