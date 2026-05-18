import svgPaths from "./svg-i79pyd7bmi";

function Paragraph() {
  return <div className="absolute h-[48px] left-[524px] top-[56.25px] w-[946px]" data-name="Paragraph" />;
}

function Logotype() {
  return (
    <div className="h-[31.311px] relative shrink-0 w-[225.548px]" data-name="logotype 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 225.548 31.3114">
        <g clipPath="url(#clip0_52_3081)" id="logotype 1">
          <path d={svgPaths.p3210f6f0} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p29c39100} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p12015000} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p2d56ddf0} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p17c97680} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p1ba6100} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p12e38880} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p101568c0} fill="var(--fill-0, white)" id="Vector_8" />
          <path clipRule="evenodd" d={svgPaths.p24308600} fill="var(--fill-0, #E95422)" fillRule="evenodd" id="Vector_9" />
          <path d={svgPaths.p29588500} fill="var(--fill-0, white)" id="Vector_10" />
        </g>
        <defs>
          <clipPath id="clip0_52_3081">
            <rect fill="white" height="31.3114" width="225.548" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[20%_12.5%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.2509 11.4">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p14265700} fill="var(--fill-0, #477AA2)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p232a0b80} fill="var(--fill-0, #477AA2)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="overflow-clip relative shrink-0 size-[19px]" data-name="Frame">
      <Group />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[27px] items-center justify-center relative shrink-0 w-full">
      <p className="font-['Montserrat:Medium',sans-serif] leading-[26.255px] not-italic relative shrink-0 text-[#477aa2] text-[16px] text-center whitespace-nowrap">Подписаться</p>
      <Frame />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fefefe] content-stretch flex flex-col items-center justify-center px-[16px] py-[10px] relative rounded-[5px] shrink-0 w-[166px]" data-name="Button">
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[85px] items-center left-[206.45px] top-[56.25px]">
      <Logotype />
      <div className="font-['Fira_Sans:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[946px] whitespace-pre-wrap">
        <p className="leading-[16px] mb-0">{`© Учредитель: Индивидуальный предприниматель Опрышко Светлана Александровна, 2018-2026. Сообщения и материалы сетевого издания `}</p>
        <p className="leading-[16px]">«Всё о стройке» (зарегистрировано Федеральной службой по надзору в сфере связи, информационных технологий и массовых коммуникаций (Роскомнадзор) 13.03.2023 за регистрационным номером Эл № ФС77-84949) сопровождаются пометкой «Всё о стройке».</p>
      </div>
      <Button />
    </div>
  );
}

export default function Footer() {
  return (
    <div className="bg-[#477aa2] border-[#e2e6ea] border-solid border-t-[0.748px] relative size-full" data-name="Footer">
      <Paragraph />
      <Frame2 />
    </div>
  );
}