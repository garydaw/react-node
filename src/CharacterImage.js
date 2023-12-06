export default function CharacterImage({unit_image, unit_name}) {

  return (
        <>
          <div className={"circle-mask-outer text-center"}>
            <img className="circle-mask" alt={unit_name} src={`${process.env.PUBLIC_URL}/characters/`+unit_image} />
          </div>
        </>
    );
}