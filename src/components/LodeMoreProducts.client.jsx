import {useServerProps} from '@shopify/hydrogen';
import SpinnerIcon from '../components/SpinnerIcon.client';
export default function LodeMoreProducts({startingCount}) {
  const {pending, serverProps, setServerProps} = useServerProps();
  return (
    <div className="flex justify-center h-14">
      {pending ? (
        <SpinnerIcon />
      ) : (
        <button
          type='button'
          className={`bg-white text-black border-4 border-black uppercase text-center px-5 py-3 font-mono font-bold drop-shadow-lg hover:bg-black hover:text-white hover:border-white active:drop-shadow-none ${  pending ? 'opacity-50' : undefined}`}
          disabled={pending}
          onClick={() => {
            setServerProps('collectionProductCount', serverProps.collectionProductCount ? serverProps.collectionProductCount + 3 : startingCount + 1);
          }}
        >
          Load more
        </button>
      )}
    </div>
  );
}
