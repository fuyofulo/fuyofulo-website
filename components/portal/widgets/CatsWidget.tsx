import catFaceIcon from "../../../images/cat_face_3d.png";
import { Widget } from "./Widget";

export function CatsWidget() {
  return (
    <Widget
      headTitle="♡ cats"
      headVariant="green"
      icon={{
        kind: "image",
        src: catFaceIcon,
        alt: "cat face",
        style: "emoji",
      }}
      title="cats"
      description="Cat photos."
      cta={{
        kind: "link",
        label: "see the cats →",
        href: "/cats",
        variant: "green",
      }}
    />
  );
}
