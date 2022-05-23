export const svgData = [
  {
    name: 'circle',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export function setAttributes(
  element: Element,
  attributes: Record<string, string>,
) {
  Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });
}

const svgConfig = {
  svg: {
    height: '100',
    width: '100',
  },
  circle: {
    cs: '50',
    cy: '50',
    r: '40',
    stroke: 'black',
    'stroke-width': '3',
    fill: 'red,',
  },
};

export const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9E9E9E" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><circle cx="12" cy="12" r="3" /></svg>`;

export const happySvgIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" style="width:24; height:24" fill="none" view-box="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"  /></svg>';

export function listIconPopupBody() {
  const svgContainer: SVGSVGElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  );
  const circleContainer = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path',
  );

  setAttributes(svgContainer, svgConfig.svg);
  setAttributes(circleContainer, svgConfig.circle);

  svgContainer.append(circleContainer);

  return svgContainer;
}
