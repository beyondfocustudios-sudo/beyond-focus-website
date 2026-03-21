import { Composition } from "remotion";
import { BeyondFocusLoading } from "./BeyondFocusLoading";

export const Root: React.FC = () => {
  return (
    <Composition
      id="BeyondFocusLoading"
      component={BeyondFocusLoading}
      durationInFrames={135}
      fps={30}
      width={1080}
      height={1080}
    />
  );
};
