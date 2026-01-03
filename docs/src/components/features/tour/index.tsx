import KageDemoContainer, {
  useKageDemo,
  KageDemoStep,
} from '@rasenganjs/kage-demo';
import Button from '@/components/common/atoms/buttons/button';
import Step01 from './step-01';
import Step02 from './step-02';
import Step03 from './step-03';
import Step04 from './step-04';

const steps: KageDemoStep[] = [
  {
    target: '#logo',
    render: (props) => <Step01 {...props} />,
  },
  {
    target: '#navigation',
    render: (props) => <Step02 {...props} />,
  },
  {
    target: '#theme-button',
    render: (props) => <Step03 {...props} />,
  },
  {
    target: '#github',
    render: (props) => <Step04 {...props} />,
  },
];

export default function KageDemoTrial() {
  const props = useKageDemo(steps);

  return (
    <>
      <KageDemoContainer {...props} />
      <Button
        onClick={props.start}
        className="bg-primary text-primary-foreground font-lexend-light h-[48px] px-6 w-full md:w-auto"
      >
        Start Trial
      </Button>
    </>
  );
}
