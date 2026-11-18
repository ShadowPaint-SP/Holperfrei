"""Writes the subpages, reusing the header and footer from index.html.

Usage: python3 site/tools/pages.py   (run from the repo root)
"""
import pathlib
import re

SITE = pathlib.Path(__file__).resolve().parent.parent
index = (SITE / "index.html").read_text()
HEAD = index[: index.index("<main>")]
FOOT = index[index.index("  <footer class=\"site-footer\">"):]


def page(name, title, desc, body, scripts=True):
    head = HEAD.replace("<title>Holperfrei</title>", f"<title>{title}</title>")
    head = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{desc}">', head)
    head = head.replace(f'<a href="{name}">', f'<a href="{name}" aria-current="page">')
    foot = FOOT if scripts else FOOT.replace('  <script src="js/map-data.js"></script>\n', "")
    (SITE / name).write_text(head + "<main>\n" + body + "\n  </main>\n\n" + foot)


page("how-it-works.html", "How Holperfrei works",
     "A camera box on garbage trucks finds road damage and the city gets a weekly, ranked map.", """
    <section class="page-head street">
      <div class="wrap">
        <h1>From garbage route to repair list.</h1>
        <p class="lead">The trucks drive every street anyway. We add a camera box, and the city gets a map of every crack and pothole each week.</p>
      </div>
    </section>

    <section class="section office" aria-labelledby="box-title">
      <div class="wrap how">
        <figure class="truck-photo">
          <div class="frame">
            <img src="img/truck.jpg" alt="An orange garbage truck at the kerb">
            <span class="bbox s-cam" style="left:77%;top:33%;width:11%;height:13%" aria-hidden="true"><em>Camera box</em></span>
          </div>
          <figcaption class="credit">Photo: JoachimKohler-HB, CC BY-SA 4.0.</figcaption>
        </figure>
        <div>
          <h2 id="box-title" style="margin-bottom:28px">The camera box</h2>
          <div class="facts">
            <div><h3>Dashcam sized</h3><p>Mounted behind the windscreen. The driver does nothing.</p></div>
            <div><h3>Runs on the truck</h3><p>Powered by the truck. We install and maintain it.</p></div>
            <div><h3>Thinks on board</h3><p>The AI runs inside the box. Only photos of damage are uploaded.</p></div>
            <div><h3>Private by design</h3><p>Faces and number plates are blurred before anything leaves the truck.</p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section street" aria-labelledby="demo-title">
      <div class="wrap">
        <div class="section-head">
          <h2 id="demo-title">What the city sees every week</h2>
          <p class="lead">One truck route through the Äußere Neustadt, worst damage first. Pick an entry to find it on the map.</p>
        </div>
        <div class="map-demo">
          <div class="map-box"><svg class="route-map" data-demo-map role="img" aria-label="Map of the Äußere Neustadt with damage marked along one truck route"></svg></div>
          <div class="map-side">
            <div class="filters" role="group" aria-label="Show damage">
              <button class="chip-btn" type="button" data-filter="1" aria-pressed="true">All</button>
              <button class="chip-btn" type="button" data-filter="2" aria-pressed="false"><span class="sev sev-2"></span>Plan repair and up</button>
              <button class="chip-btn" type="button" data-filter="3" aria-pressed="false"><span class="sev sev-3"></span>Fix now</button>
            </div>
            <ol class="dmg-list" data-dmg-list></ol>
            <div class="dmg-detail" data-dmg-detail aria-live="polite"></div>
          </div>
        </div>
        <p class="small" style="margin-top:16px">Sample data on real streets. Map data © OpenStreetMap contributors.</p>
      </div>
    </section>

    <section class="section street" style="padding-top:0" aria-labelledby="types-title">
      <div class="wrap">
        <div class="section-head">
          <h2 id="types-title">What it finds</h2>
          <p class="lead">Each find gets a type, a box and an urgency rank, so crews know where to go first.</p>
        </div>
        <div class="gallery">
          <figure><div class="frame"><img src="img/crack-long.jpg" alt="Long cracks in asphalt with weeds growing" loading="lazy"><span class="bbox s1" style="left:30%;top:12%;width:45%;height:80%"><em>Long crack 0.90</em></span></div>
            <figcaption><b><span class="sev sev-1"></span>Long crack</b><span>Watch. Seal it on the next crew run.</span></figcaption></figure>
          <figure><div class="frame"><img src="img/stage-1-crack.jpg" alt="A star-shaped crack in asphalt" loading="lazy"><span class="bbox s1" style="left:25%;top:21%;width:44%;height:56%"><em>Crack 0.91</em></span></div>
            <figcaption><b><span class="sev sev-1"></span>Star crack</b><span>Watch. Cheap to seal while it's small.</span></figcaption></figure>
          <figure><div class="frame"><img src="img/stage-2-network.jpg" alt="A network of cracks across a lane" loading="lazy"><span class="bbox s2" style="left:65%;top:32%;width:34%;height:59%"><em>Crack network 0.88</em></span></div>
            <figcaption><b><span class="sev sev-2"></span>Crack network</b><span>Plan repair. Patch it before frost.</span></figcaption></figure>
          <figure><div class="frame"><img src="img/crack-edge.jpg" alt="Asphalt breaking at the road edge" loading="lazy"><span class="bbox s2" style="left:3%;top:22%;width:94%;height:50%"><em>Edge break 0.86</em></span></div>
            <figcaption><b><span class="sev sev-2"></span>Edge break</b><span>Plan repair. The edge is crumbling.</span></figcaption></figure>
          <figure><div class="frame"><img src="img/pothole-lingner.jpg" alt="A pothole on Lingnerallee in Dresden" loading="lazy"><span class="bbox s3" style="left:28%;top:32%;width:32%;height:30%"><em>Pothole 0.95</em></span></div>
            <figcaption><b><span class="sev sev-3"></span>Pothole, Lingnerallee</b><span>Fix now. A risk for bikes and cars.</span></figcaption></figure>
          <figure><div class="frame"><img src="img/pothole-water.jpg" alt="A deep pothole filled with water" loading="lazy"><span class="bbox s3" style="left:2%;top:24%;width:96%;height:56%"><em>Pothole 0.98</em></span></div>
            <figcaption><b><span class="sev sev-3"></span>Deep pothole</b><span>Fix now. Water hides how deep it is.</span></figcaption></figure>
        </div>
      </div>
    </section>

    <section class="section office" aria-labelledby="fleet-title">
      <div class="wrap split">
        <figure>
          <img class="tall" src="img/srd-cab.jpg" alt="Cab of an orange Stadtreinigung Dresden vehicle" loading="lazy">
          <figcaption class="credit">Photo: ubahnverleih, CC BY 3.0.</figcaption>
        </figure>
        <div>
          <h2 id="fleet-title" style="margin-bottom:24px">The waste company drives. We pay them for it.</h2>
          <p class="lead">The fleet partner carries the camera and pays nothing. In return they get:</p>
          <div class="facts" style="margin-top:32px">
            <div><h3>€300 per truck a year</h3><p>For doing what they already do.</p></div>
            <div><h3>A free dashcam</h3><p>Footage for accidents and insurance disputes.</p></div>
            <div><h3>Bin and dumping alerts</h3><p>The same camera spots overflowing bins and illegal dumping.</p></div>
            <div><h3>Zero effort</h3><p>We install, maintain and handle data protection.</p></div>
          </div>
        </div>
      </div>
    </section>
""")

page("for-cities.html", "Holperfrei for cities",
     "Weekly road damage maps for city road departments, priced per kilometre of road.", """
    <section class="page-head street">
      <div class="wrap">
        <h1>Know every street. Every week.</h1>
        <p class="lead">For road departments that keep hundreds of kilometres safe with few staff. No survey vehicle, no staff driving around, no hardware to buy.</p>
      </div>
    </section>

    <section class="section office" aria-labelledby="why-title">
      <div class="wrap">
        <h2 id="why-title" style="margin-bottom:48px">What changes for your department</h2>
        <div class="facts three">
          <div><h3>Repair while it's cheap</h3><p>See cracks before winter turns them into potholes. Send one crew to a whole cluster.</p></div>
          <div><h3>Proof you inspected</h3><p>A weekly, timestamped record for every street, for your Verkehrssicherungspflicht.</p></div>
          <div><h3>Arguments for the council</h3><p>Ranked repair lists, before-and-after photos and reports, ready to present.</p></div>
        </div>
      </div>
    </section>

    <section class="section office" style="padding-top:0" aria-labelledby="calc-title">
      <div class="wrap price" style="align-items:start">
        <div>
          <h2 id="calc-title" style="margin-bottom:24px">Priced per kilometre of road</h2>
          <p class="lead">One yearly subscription. Cameras, installation and the fleet partner are included.</p>
          <p class="small">A one-time setup fee of about €2,500 covers installation, map import and staff training.</p>
        </div>
        <form class="calc" data-calc>
          <div class="calc-row">
            <div><label for="km">Your road network in km</label><input id="km" name="km" type="number" min="0" step="10" value="1440" inputmode="numeric"></div>
            <fieldset>
              <legend>Plan</legend>
              <div class="tiers">
                <label><input type="radio" name="tier" value="50"><span>Essentials<small>€50/km</small></span></label>
                <label><input type="radio" name="tier" value="75" checked><span>Pro<small>€75/km</small></span></label>
                <label><input type="radio" name="tier" value="100"><span>Enterprise<small>€100/km</small></span></label>
              </div>
            </fieldset>
          </div>
          <div class="calc-out" aria-live="polite">
            <div class="total"><span>Per year</span><b data-out="year"></b></div>
            <div><span>Per week</span><b data-out="week"></b></div>
            <div><span>Road checks</span><b data-out="checks"></b></div>
            <div><span>One survey at Dresden's 2026 rate</span><b data-out="survey"></b></div>
          </div>
          <p class="small includes"><b>Essentials:</b> damage map and monthly report. <b>Pro:</b> live map, ranked repair list, work orders, inspection log. <b>Enterprise:</b> Pro plus budget forecast, GIS and API access, bike paths.</p>
        </form>
      </div>
    </section>

    <section class="section street" aria-labelledby="vs-title">
      <div class="wrap">
        <h2 id="vs-title" style="margin-bottom:40px">How it compares</h2>
        <div class="table-scroll">
          <table class="vs" style="color:var(--marking)">
            <thead><tr><th></th><th>Holperfrei</th><th>Smartphone in city cars</th><th>Survey vehicle</th></tr></thead>
            <tbody>
              <tr><th>How often</th><td class="us">Every street, every week</td><td>When staff drive, often twice a year</td><td>Once every few years</td></tr>
              <tr><th>Extra effort</th><td class="us">None</td><td>City staff drive the routes</td><td>Contractor vehicle</td></tr>
              <tr><th>Price</th><td class="us">€75 per km a year</td><td>About €100 per km a year</td><td>€50 to €208 per km, per survey</td></tr>
            </tbody>
          </table>
        </div>
        <p class="small" style="margin-top:20px">Dresden is building free, open-source road software. Holperfrei is meant to be its weekly data feed, not a competitor.</p>
      </div>
    </section>

    <section class="section office" id="pilot" aria-labelledby="pilot-steps">
      <div class="wrap">
        <div class="section-head">
          <h2 id="pilot-steps">Start with a pilot</h2>
          <p class="lead">Three months, one district, a few trucks, paid by grants. Your department needs no budget and no tender to try it.</p>
        </div>
        <ol class="steps row">
          <li><h3>We show you your roads</h3><p>We drive one district ourselves and bring you a map of your own potholes.</p></li>
          <li><h3>Three months on the trucks</h3><p>A few trucks carry camera boxes. You get the weekly map and fix list.</p></li>
          <li><h3>You decide</h3><p>Switch to a subscription, or stop. You keep the data either way.</p></li>
        </ol>
        <div class="actions"><a class="btn btn-truck" href="about.html#contact">Talk to us about a pilot</a></div>
      </div>
    </section>
""", scripts=False)

page("about.html", "About Holperfrei",
     "Holperfrei is a team of computer science students from TU Dresden.", """
    <section class="page-head street">
      <div class="wrap">
        <h1>We're Holperfrei.</h1>
        <p class="lead">Computer science students from TU Dresden. Holperfrei is German for free of bumps, which is what we want Dresden's streets to be.</p>
      </div>
    </section>

    <section class="section office" aria-labelledby="why-dd">
      <div class="wrap split">
        <figure>
          <img class="tall" src="img/dresden-srd.jpg" alt="A city cleaning worker in front of the Frauenkirche in Dresden" loading="lazy">
          <figcaption class="credit">Photo: Slick, CC0.</figcaption>
        </figure>
        <div>
          <h2 id="why-dd" style="margin-bottom:24px">Why we start in Dresden</h2>
          <p class="lead">Every morning we ride over the same cracks on the way to campus, and we watch them turn into potholes by spring.</p>
          <div class="facts" style="margin-top:32px">
            <div><h3>We live here</h3><p>We know the streets, and the city already runs a Smart City project with TU Dresden.</p></div>
            <div><h3>The trucks are already here</h3><p>The city owns its waste company, so the road department and the fleet are one call apart.</p></div>
            <div><h3>The city needs the data</h3><p>Dresden is building open-source road software. We can feed it every week.</p></div>
            <div><h3>One success travels</h3><p>Leipzig, Chemnitz and smaller towns trust what Dresden already uses.</p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section street" aria-labelledby="plan-title">
      <div class="wrap">
        <h2 id="plan-title" style="margin-bottom:56px">The plan</h2>
        <ol class="timeline">
          <li><b>2027</b><p>Pilot in one Dresden district, funded by grants.</p></li>
          <li><b>2028</b><p>First paying cities and towns in Saxony.</p></li>
          <li><b>2030</b><p>Subscriptions cover our costs.</p></li>
          <li><b>2031</b><p>Over 100 cities, and road data for insurers and map apps.</p></li>
        </ol>
      </div>
    </section>

    <section class="section office" id="contact" aria-labelledby="contact-title">
      <div class="wrap">
        <div class="section-head">
          <h2 id="contact-title">What we're looking for</h2>
        </div>
        <div class="facts three">
          <div><h3>A pilot district</h3><p>A road department in Dresden that wants to see its streets every week.</p></div>
          <div><h3>A fleet partner</h3><p>A waste company, or a bus or delivery fleet, to carry the first camera boxes.</p></div>
          <div><h3>Mentors and funding</h3><p>People who know public tenders, and support for our EXIST application.</p></div>
        </div>
        <p class="lead" style="margin-top:56px">Talk to us after the pitch, or find us at the Faculty of Computer Science, TU Dresden.</p>
      </div>
    </section>
""", scripts=False)

CREDITS = [
    ("truck.jpg", "Mercedes-Benz Econic Müllfahrzeug in Winterthur (2022)", "JoachimKohler-HB", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Mercedes-Benz_Econic_M%C3%BCllfahrzeug_in_Winterthur_(2022).jpg"),
    ("srd-cab.jpg", "Fahrzeug der Stadtreinigung Dresden", "ubahnverleih", "CC BY 3.0", "https://commons.wikimedia.org/wiki/File:Fahrzeug_der_Stadtreinigung_Dresden.jpg"),
    ("stage-1-crack.jpg", "It starts with a crack...", "XoMEoX", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:It_starts_with_a_crack..._(35815932072).jpg"),
    ("stage-2-network.jpg", "Deteriorated asphalt", "Bidgee", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Deteriorated_asphalt.jpg"),
    ("stage-3-pothole.jpg", "Schlagloch in Dresden Reichenbachstraße", "Fuzre Fitrinete", "CC BY 3.0", "https://commons.wikimedia.org/wiki/File:Schlagloch_in_Dresden_Reichenbachstra%C3%9Fe.jpg"),
    ("stage-4-broken.jpg", "(20230218) Magdeburg 10", "Roy Zuo", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:(20230218)_Magdeburg_10.jpg"),
    ("crack-long.jpg", "Asphalt Cracks", "Tony Webster", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Asphalt_Cracks_(42291397720).jpg"),
    ("crack-edge.jpg", "Cracks", "Stiller Beobachter", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Cracks_-_Flickr_-_Stiller_Beobachter_(1).jpg"),
    ("pothole-lingner.jpg", "Schlagloch Lingnerallee, Dresden", "Kalispera Dell", "CC BY 3.0", "https://commons.wikimedia.org/wiki/File:Schlagloch_Lingnerallee,_Dresden_(57).jpg"),
    ("pothole-leonhard.jpg", "Leonhard-Frank-Straße, Dresden", "Fuzre Fitrinete", "CC BY 3.0", "https://commons.wikimedia.org/wiki/File:Leonhard-Frank-Stra%C3%9Fe,_Dresden_(595).jpg"),
    ("pothole-water.jpg", "Schlagloch zwischen Friedrichsfeld und Grenzhof", "4028mdk09", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Schlagloch_zwischen_Friedrichsfeld_und_Grenzhof.JPG"),
    ("dresden-srd.jpg", "Impressionen Dresden 2011", "Slick", "CC0", "https://commons.wikimedia.org/wiki/File:Impressionen_Dresden_2011-08-29-9388.jpg"),
]
items = "\n".join(
    f'          <li><img src="img/{f}" alt="" loading="lazy"><span><a href="{u}">{t}</a> by {a}, {l}. Cropped and resized.</span></li>'
    for f, t, a, l, u in CREDITS)
page("credits.html", "Holperfrei image credits", "Sources and licences for the photos and map data on this site.", f"""
    <section class="section office">
      <div class="wrap">
        <h1 style="font-size:clamp(44px,6vw,80px);margin-bottom:24px">Image credits</h1>
        <p class="lead" style="margin-bottom:40px">All photos come from Wikimedia Commons. The detection boxes on them are illustrations, not real model output. Map data © OpenStreetMap contributors, ODbL. Damage on the map is sample data.</p>
        <ul class="credits-list">
{items}
        </ul>
      </div>
    </section>
""", scripts=False)
