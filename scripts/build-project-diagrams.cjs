const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'project-evidence.js'),'utf8'),context);
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
fs.mkdirSync(path.join(root,'assets/diagrams'),{recursive:true});
for(const [id,p] of Object.entries(context.window.PROJECT_EVIDENCE)){
  const nodes=p.flow.map(([title,detail],i)=>{const x=i%2?530:50,y=i<2?150:315;return `<rect x="${x}" y="${y}" width="380" height="112" rx="6" fill="#111820" stroke="#33404c"/><text x="${x+22}" y="${y+29}" fill="${p.color}" font-size="13">0${i+1}</text><text x="${x+22}" y="${y+59}" fill="#e8eaf0" font-size="24">${escape(title)}</text><text x="${x+22}" y="${y+88}" fill="#a7b3c1" font-size="18">${escape(detail)}</text>`;}).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="960" height="480" viewBox="0 0 960 480" role="img"><title>${escape(p.name)} architecture overview</title><desc>${escape(p.flow.map(s=>s.join(': ')).join(' → '))}</desc><rect width="960" height="480" fill="#080d13"/><g font-family="Arial, sans-serif"><text x="50" y="49" fill="${p.color}" font-size="13">SYSTEM OVERVIEW</text><text x="50" y="95" fill="#e8eaf0" font-size="${p.name.length>30?30:36}">${escape(p.name)}</text>${nodes}<path d="M442 206H514m-9-6 9 6-9 6M720 274V288H240V303m-6-9 6 9 6-9M442 371H514m-9-6 9 6-9 6" fill="none" stroke="${p.color}" stroke-width="2"/><text x="50" y="458" fill="#a7b3c1" font-size="12">Architecture illustration · ${escape(p.evidence)}</text></g></svg>`;
  fs.writeFileSync(path.join(root,'assets/diagrams',id+'.svg'),svg);
}
console.log('Built 12 source-backed architecture illustrations.');
