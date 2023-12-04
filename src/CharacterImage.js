export default function CharacterImage({unit_image, circle}) {

  return (
        <>
          <div className={"circle-mask-outer text-center"}>
            <img className="circle-mask" src={`${process.env.PUBLIC_URL}/characters/`+unit_image} />
          </div>
        </>
    );
}