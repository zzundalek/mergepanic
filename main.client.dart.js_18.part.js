((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var B,C,F,G,K,A={
bJ(d){var x=$.nu.k(0,d)
if(x==null){x=new A.f9(d,B.f([],y.C))
$.nu.i(0,d,x)}return x},
fa:function fa(d,e){this.a=d
this.b=e},
dn:function dn(d,e){this.c=d
this.a=e},
hy:function hy(d,e,f,g,h,i,j){var _=this
_.d$=d
_.e$=e
_.f$=f
_.cy=null
_.db=g
_.c=_.b=_.a=null
_.d=h
_.e=null
_.f=i
_.w=_.r=null
_.x=j
_.Q=_.z=_.y=null
_.as=!1
_.at=!0
_.ax=!1
_.CW=null
_.cx=!1},
be:function be(d,e,f){var _=this
_.w=d
_.x=e
_.y=null
_.z=f
_.d=$
_.c=_.b=_.a=null},
f9:function f9(d,e){var _=this
_.a=d
_.e=_.d=_.c=_.b=$
_.f=e
_.r=!0},
iH:function iH(){},
ij:function ij(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.at=g
_.a=h},
j0:function j0(d,e){this.a=d
this.b=e},
fH:function fH(d,e){this.c=d
this.a=e},
hi:function hi(d,e){this.c=d
this.a=e},
rm(){return new A.bz(null)},
bz:function bz(d){this.a=d},
hl:function hl(){this.d=!1
this.c=this.a=null},
kh:function kh(d){this.a=d},
kg:function kg(d){this.a=d},
qT(d){var x,w,v=y.w,u=B.O(v,v)
for(x=0;x<B.W(d.length);++x){w=B.y(d.item(x))
u.i(0,B.w(w.name),B.w(w.value))}return u}},E,H,L,M,I,D
B=c[0]
C=c[2]
F=c[13]
G=c[14]
K=c[15]
A=a.updateHolder(c[7],A)
E=c[25]
H=c[19]
L=c[18]
M=c[20]
I=c[10]
D=c[17]
A.fa.prototype={
aA(){return"AttachTarget."+this.b}}
A.dn.prototype={
aa(){var x=B.cd(y.b),w=($.X+1)%16777215
$.X=w
return new A.hy(null,!1,!1,x,w,this,C.f)}}
A.hy.prototype={
aM(){var x=this.f
x.toString
y.h.a(x)
return E.as},
ai(){var x,w,v=this.f
v.toString
y.h.a(v)
x=this.e
x.toString
x=new A.be(B.f([],y.k),E.t,x)
x.bC("")
w=A.bJ(x.x)
C.b.m(w.f,x)
w.r=!0
x.se5(v.c)
return x},
ac(d){var x
y.n.a(d)
x=this.f
x.toString
y.h.a(x)
d.si0(E.t)
d.se5(x.c)},
bb(){var x,w
this.da()
x=this.d$
x.toString
y.n.a(x)
w=this.e
w.toString
x.shf(w)},
aC(){var x,w
this.eV()
x=this.d$
x.toString
y.n.a(x)
w=A.bJ(x.x)
C.b.F(w.f,x)
w.aX()}}
A.be.prototype={
si0(d){var x=this,w=x.x
if(w===d)return
w=A.bJ(w)
C.b.F(w.f,x)
w.aX()
x.x=d
w=A.bJ(d)
C.b.m(w.f,x)
w.r=!0
A.bJ(x.x).aX()},
se5(d){y.f.a(d)
if(this.y===d)return
this.y=d
A.bJ(this.x).aX()},
shf(d){if(this.z===d)return
this.z=d
A.bJ(this.x).ex(!0)},
aq(d,e){var x,w,v,u,t=this
d.a=t
try{x=d.gM()
w=e==null?null:e.gM()
if(w==null&&C.b.J(t.w,x))return
if(w!=null&&!C.b.J(t.w,w))w=null
v=t.w
C.b.F(v,x)
u=w!=null?C.b.ak(v,w)+1:0
C.b.ee(v,u,x)
A.bJ(t.x).aX()}finally{d.aj()}},
F(d,e){C.b.F(this.w,e.gM())
e.a=null
A.bJ(this.x).aX()}}
A.f9.prototype={
ge9(){var x,w=this,v=w.b
if(v===$){x=B.y(B.h(b.G.document).querySelector(w.a.b))
x.toString
w.b!==$&&B.f1()
w.b=x
v=x}return v},
ex(d){var x,w,v,u,t,s,r,q,p,o,n,m=this
if(d||m.r){C.b.ao(m.f,new A.iH())
m.r=!1}x=m.c
if(x===$){w=A.qT(B.h(m.ge9().attributes))
m.c!==$&&B.f1()
m.c=w
x=w}for(v=m.f,u=v.length,t=0;t<v.length;v.length===u||(0,B.ay)(v),++t){s=v[t].y
if(s!=null)x.N(0,s)}r=B.mJ(y.w)
for(q=0;v=m.ge9(),q<B.W(B.h(v.attributes).length);++q)r.m(0,B.w(B.y(B.h(v.attributes).item(q)).name))
if(x.a!==0)for(u=new B.aC(x,B.i(x).h("aC<1,2>")).gA(0);u.n();){p=u.d
o=p.a
B.fb(v,o,p.b)
r.F(0,o)}if(r.a!==0)for(u=B.od(r,r.r,r.$ti.c),o=u.$ti.c;u.n();){n=u.d
if(n==null)n=o.a(n)
v.removeAttribute(n)}},
aX(){return this.ex(!1)}}
A.ij.prototype={
I(d){var x=this,w=null,v=y.w
v=B.O(v,v)
v.i(0,"cx",x.c)
v.i(0,"cy",x.d)
v.i(0,"r",x.e)
return new B.ae("circle",w,w,w,v,w,x.at,w)}}
A.j0.prototype={
aA(){return"Display."+this.b}}
A.fH.prototype={
I(d){var x=y.F
return new I.cu(this.c,B.f([D.bc(B.f([],x),"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z")],x),null)}}
A.hi.prototype={
I(d){var x=y.F
return new I.cu(this.c,B.f([new A.ij("12","12","4",B.f([],x),null),D.bc(B.f([],x),"M12 4h.01"),D.bc(B.f([],x),"M20 12h.01"),D.bc(B.f([],x),"M12 20h.01"),D.bc(B.f([],x),"M4 12h.01"),D.bc(B.f([],x),"M17.657 6.343h.01"),D.bc(B.f([],x),"M17.657 17.657h.01"),D.bc(B.f([],x),"M6.343 17.657h.01"),D.bc(B.f([],x),"M6.343 6.343h.01")],x),null)}}
A.bz.prototype={
aP(){return new A.hl()}}
A.hl.prototype={
bf(){this.ci()
this.d=B.aT(B.y(B.h(b.G.document).documentElement).getAttribute("data-theme"))==="dark"},
I(d){var x,w=this,v=null,u=y.F,t=B.f([],u),s=w.d?"dark":"light",r=y.w
t.push(new A.dn(B.bu(["data-theme",s],r,r),v))
r=B.bu(["aria-label","Theme Toggle"],r,r)
s=F.l7(w.d?E.y:v,v,v,v,v,v,v)
s=G.dj(B.f([new A.fH(20,v)],u),s)
x=F.l7(w.d?v:E.y,v,v,v,v,v,v)
t.push(L.m0(B.f([s,G.dj(B.f([new A.hi(20,v)],u),x)],u),r,"theme-toggle",v,new A.kh(w),v))
return new K.cc(t,v)}}
var z=a.updateTypes(["d(be,be)"])
A.iH.prototype={
$2(d,e){var x=y.n
x.a(d)
x.a(e)
return d.z-e.z},
$S:z+0}
A.kh.prototype={
$0(){var x,w=this.a
w.af(new A.kg(w))
x=B.h(B.h(b.G.window).localStorage)
w=w.d?"dark":"light"
x.setItem("jaspr:theme",w)},
$S:0}
A.kg.prototype={
$0(){var x=this.a
x.d=!x.d},
$S:0};(function inheritance(){var x=a.inheritMany,w=a.inherit
x(B.cq,[A.fa,A.j0])
w(A.dn,B.l)
w(A.hy,B.bR)
w(A.be,B.dy)
w(A.f9,B.j)
w(A.iH,B.bK)
x(M.E,[A.ij,A.fH,A.hi])
w(A.bz,H.a7)
w(A.hl,H.V)
x(B.aW,[A.kh,A.kg])})()
B.ao(b.typeUniverse,JSON.parse('{"be":{"an":[],"mN":[],"bS":[]},"dn":{"l":[]},"hy":{"aj":[],"m":[],"a2":[]},"ij":{"E":[],"l":[]},"fH":{"E":[],"l":[]},"hi":{"E":[],"l":[]},"bz":{"a7":[],"l":[]},"hl":{"V":["bz"],"V.T":"bz"}}'))
var y={h:B.r("dn"),n:B.r("be"),b:B.r("m"),C:B.r("t<be>"),F:B.r("t<l>"),k:B.r("t<p>"),w:B.r("b"),f:B.r("u<b,b>?")};(function constants(){var x=a.makeConstList
E.t=new A.fa(0,"html")
E.y=new A.j0(0,"none")
E.as=x([],y.F)})();(function staticFields(){$.nu=B.O(B.r("fa"),B.r("f9"))})()};
(a=>{a["1s4NQabeGJp+unrbR50nhLeAywU="]=a.current})($__dart_deferred_initializers__);
//# sourceMappingURL=main.client.dart.js_18.part.js.map
