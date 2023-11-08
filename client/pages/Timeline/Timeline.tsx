import React, { useState } from "react";
import styles from "./Timeline.module.scss";

interface IDateRange {
  value: number;
  label: "bc" | "ad";
}

interface IArtifact {
  name: string;
  description: string;
  location: string;
  images: string[];
}

interface ITimelineItem {
  title: string;
  description: string;
  range: { start: IDateRange; end: IDateRange };
  artifacts?: IArtifact[];
  subdivisions?: ITimelineItem[];
}

type ITimeline = ITimelineItem[];

function Timeline() {
  const timeline: ITimeline = [
    {
      title: "Neolithic",
      description: "The transition from nomadic hunter-gatherers to settled agriculturalists.",
      range: { start: { value: 6000, label: "bc" }, end: { value: 2500, label: "bc" } },
      subdivisions: [
        {
          title: "Middle to Late Neolithic",
          description:
            "The rise of pottery, polished stone tools, and early urbanization leading to the first cities.",
          range: { start: { value: 3000, label: "bc" }, end: { value: 2500, label: "bc" } },
        },
        {
          title: "Early Neolithic",
          description:
            "Beginning of agriculture, domestication of animals, and the establishment of permanent settlements.",
          range: { start: { value: 4000, label: "bc" }, end: { value: 3000, label: "bc" } },
        },
      ],
    },
    {
      title: "Mesolithic",
      description:
        "Transition out of the ice age, and characterized by the innovation of microliths and a continuation of nomadic lifestyles.",
      range: { start: { value: 10000, label: "bc" }, end: { value: 6000, label: "bc" } },
      subdivisions: [
        {
          title: "Late Mesolithic",
          description:
            "Increated adaptation to forested landscapes, advancements in tools and early forms of sedentism.",
          range: { start: { value: 6000, label: "bc" }, end: { value: 4000, label: "bc" } },
        },
        {
          title: "Early Mesolithic",
          description: "Microlithic tools are common, and people adapt to post-glacial movements.",
          range: { start: { value: 10000, label: "bc" }, end: { value: 6000, label: "bc" } },
        },
      ],
    },
    {
      title: "Upper Paleolithic",
      description:
        "A period of significant culturing development, with the creation of art, music and sophisticated tools.",
      range: { start: { value: 48000, label: "bc" }, end: { value: 10000, label: "bc" } },
      subdivisions: [
        {
          title: "Late Upper Paleolithic",
          description:
            "Magdalenian culture with fine tools and continued artistic expression. The end of the Ice Age.",
          range: { start: { value: 18000, label: "bc" }, end: { value: 10000, label: "bc" } },
        },
        {
          title: "Middle Upper Paleolithic",
          description:
            "Height of the Ice Age with extensive cave art and bone tools. Settlements become more structured.",
          range: { start: { value: 28000, label: "bc" }, end: { value: 18000, label: "bc" } },
        },
        {
          title: "Early Upper Paleolithic",
          description:
            "Appearance of figurative art, musical instruments, and blade tools. Humans reach Australia.",
          range: { start: { value: 48000, label: "bc" }, end: { value: 28000, label: "bc" } },
        },
      ],
    },
    {
      title: "Middle Paleolithic",
      description:
        "The development of Homo sapiens and Neanderthals, and the spread of humans to various parts of the world.",
      range: { start: { value: 298000, label: "bc" }, end: { value: 48000, label: "bc" } },
      subdivisions: [
        {
          title: "Late Middle Paleolithic",
          description:
            "Homo sapiens migrate out of Africa, interacting and occasionally interbreeding with Neanderthals and Denisovans.",
          range: { start: { value: 98000, label: "bc" }, end: { value: 48000, label: "bc" } },
        },
        {
          title: "Middle Middle Paleolithic",
          description: "Spread of Homo sapiens within Africa, emergence of behavioral modernity.",
          range: { start: { value: 198000, label: "bc" }, end: { value: 98000, label: "bc" } },
        },
        {
          title: "Early Middle Paleolithic",
          description: "Transition from the Acheulean to the Levallois technology in toolmaking.",
          range: { start: { value: 298000, label: "bc" }, end: { value: 198000, label: "bc" } },
        },
      ],
    },
  ];

  const [currentItem, setCurrentItem] = useState(0);

  return <div className={styles.timeline}></div>;
}

export default Timeline;

interface TimelineItemProps {}

function TimelineItem({}: TimelineItemProps) {
  return (
    <div className={styles.timeline_item}>
      <span className={styles.item_title}>3000 B.C.</span>
    </div>
  );
}
