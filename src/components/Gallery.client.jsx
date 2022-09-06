import React from 'react'
import {Image,useProductOptions,MediaFile} from '@shopify/hydrogen';
export default function Gallery({product}) {
  const {selectedVariant} = useProductOptions();
  const media = product.media.nodes;
  const fetureMeida = selectedVariant.image || media[0]?.image; //One return in -> fetureMeida variable
  const fetureMeidaSrc = fetureMeida?.url.split("?")[0]; //split(?) -> Remove text after '?' 
  const galleryMedia =  media.filter((med)=>{
    if(med.mediaContentType === MODEL_3D_TYPE || med.mediaContentType == VIDEO_TYPE || med.mediaContentType ===EXTERNAL_VIDEO_TYPE){
      return true;
    }
    return !med.image.url.includes(fetureMeidaSrc); //check both url -> return true/false;

  })
  //Error handle 
  if(!media.length){
    return null;
    }
  return (
    <div className='gap-4 flex  md:grid md:grid-cols-2  overflow-x-scrol scroll-smooth h-[485px] md:h-auto place-content-start' tabIndex="-1">
      <Image fetchpriority="high" data={selectedVariant.image} className="md:h-auto object-cover object-center flex-shrink-0 snap-start md:col-span-2 border border-gray-200 rounded-lg"/>
      {galleryMedia.map((med)=>{
        let extraPorps = {};
        if(med.mediaContentType === MODEL_3D_TYPE){ //If your image is (3D) Then this code will be run
          extraPorps = MODEL_3D_PROPS;
        }
        return(
            <MediaFile
              tabIndex="0"
              key={med.id || med.image.id}
              data={med}
              fetchpriority="low"
              options={{
                height:'485',
                crop:'center'
              }}
              {...extraPorps}
            />
        );        
      })}
    </div>
  )
}
//Global variable 
const MODEL_3D_TYPE = "MODEL_3D";
const VIDEO_TYPE = "VIDEO";
const EXTERNAL_VIDEO_TYPE = "EXTERNAL_VIDEO";
const MODEL_3D_PROPS = {
  interactionPromptThreshold:'0'
};