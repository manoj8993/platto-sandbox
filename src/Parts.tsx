// Parts sheet: ready-made pieces in the Platto style, for the Figma import.
// Open the app with ?view=parts and import that page into Figma (html.to.design plugin).
// In Figma, teams duplicate a screen, copy a part onto it and change the words.

import type { ReactNode } from 'react';
import { Badge, Button, ScreenHeader } from './components/ui';

function Group({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mb-5 mt-1 text-mist">{note}</p>
      <div className="flex flex-wrap items-start gap-8">{children}</div>
    </section>
  );
}

function Part({ label, children, width = 360 }: { label: string; children: ReactNode; width?: number }) {
  return (
    <figure className="flex flex-col gap-2" style={{ width }}>
      <div className="rounded-2xl bg-paper p-4">{children}</div>
      <figcaption className="text-sm font-medium text-mist">{label}</figcaption>
    </figure>
  );
}

function Banner({ tone, icon, title, body, action }: { tone: 'info' | 'warn' | 'bad' | 'good'; icon: string; title: string; body: string; action?: string }) {
  const tones = {
    info: 'bg-white border-line',
    warn: 'bg-saffron/20 border-saffron/60',
    bad: 'bg-tomato/10 border-tomato/40',
    good: 'bg-basil/10 border-basil/40',
  };
  return (
    <div className={`flex gap-3 rounded-2xl border p-4 ${tones[tone]}`}>
      <span className="text-xl leading-none">{icon}</span>
      <div className="flex-1">
        <p className="text-[15px] font-semibold">{title}</p>
        <p className="mt-0.5 text-sm text-ink/75">{body}</p>
        {action && <p className="mt-2 text-sm font-semibold underline underline-offset-2">{action}</p>}
      </div>
    </div>
  );
}

function Field({ label, value, error, hint }: { label: string; value: string; error?: string; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <div className={`mt-1 rounded-xl border bg-white px-4 py-3 text-[15px] ${error ? 'border-tomato' : 'border-line'}`}>{value}</div>
      {error && <span className="mt-1 block text-sm text-tomato">{error}</span>}
      {hint && !error && <span className="mt-1 block text-sm text-mist">{hint}</span>}
    </label>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`inline-flex h-7 w-12 items-center rounded-full p-1 ${on ? 'bg-basil' : 'bg-line'}`}>
      <span className={`h-5 w-5 rounded-full bg-white shadow ${on ? 'ml-auto' : ''}`} />
    </span>
  );
}

function Row({ icon, title, sub, right }: { icon: string; title: string; sub: string; right?: ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-white px-4 py-3 last:border-0">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-lg">{icon}</span>
      <div className="flex-1">
        <p className="text-[15px] font-semibold">{title}</p>
        <p className="text-sm text-mist">{sub}</p>
      </div>
      {right}
    </div>
  );
}

function Steps({ current }: { current: number }) {
  const steps = ['Step one', 'Step two', 'Step three', 'Step four'];
  return (
    <div className="rounded-2xl bg-white p-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-3 py-1.5">
          <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${i < current ? 'bg-basil text-white' : i === current ? 'bg-saffron text-ink' : 'bg-line text-mist'}`}>{i < current ? '✓' : i + 1}</span>
          <span className={`text-[15px] ${i <= current ? 'font-semibold' : 'text-mist'}`}>{s}</span>
        </div>
      ))}
    </div>
  );
}

function BlankPhone({ caption, children }: { caption: string; children?: ReactNode }) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <div className="relative h-[780px] w-[380px] overflow-hidden rounded-[44px] border-[10px] border-ink bg-paper shadow-xl">
        <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-ink" />
        <div className="flex h-full flex-col">{children}</div>
      </div>
      <figcaption className="text-sm font-medium text-mist">{caption}</figcaption>
    </figure>
  );
}

export function Parts() {
  return (
    <div className="min-h-screen bg-[#E9EAE4] px-10 py-10">
      <h1 className="text-3xl font-semibold">Platto: parts sheet</h1>
      <p className="mb-10 mt-1 max-w-3xl text-mist">
        Ready-made pieces in the Platto style. To design a screen: duplicate a starter screen, copy a part from this page onto it,
        then double-click any text to change the words. Nothing here needs drawing.
      </p>

      <Group title="Buttons" note="One main action per screen uses the yellow button.">
        <Part label="Main action" width={220}><Button>Main action</Button></Part>
        <Part label="Second action" width={220}><Button variant="secondary">Second action</Button></Part>
        <Part label="Quiet action" width={220}><Button variant="ghost">Quiet action</Button></Part>
        <Part label="Risky action" width={220}><Button variant="danger">Cancel order</Button></Part>
        <Part label="Disabled" width={220}><Button disabled>Not available yet</Button></Part>
        <Part label="Full-width action bar" width={380}>
          <div className="border-t border-line bg-white p-4"><Button className="w-full">Main action</Button></div>
        </Part>
      </Group>

      <Group title="Banners and messages" note="Put a banner near the top of a screen, or just above the thing it talks about.">
        <Part label="Information"><Banner tone="info" icon="ℹ️" title="Something the customer should know" body="One short sentence that explains it." action="Optional link" /></Part>
        <Part label="Warning"><Banner tone="warn" icon="⏱️" title="Heads up: something changed" body="Say what changed and what happens next." action="Optional link" /></Part>
        <Part label="Problem"><Banner tone="bad" icon="⚠️" title="Something went wrong" body="Say what failed and how to fix it." action="Try again" /></Part>
        <Part label="Success"><Banner tone="good" icon="✅" title="Done" body="Confirm what just happened." /></Part>
        <Part label="Toast (short message at the bottom)">
          <div className="flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-white shadow-lg">
            <span>✓</span><span className="flex-1 text-sm font-medium">Saved</span><span className="text-sm font-semibold text-saffron">Undo</span>
          </div>
        </Part>
      </Group>

      <Group title="Error and empty states" note="Every feature needs at least one: what the customer sees when it doesn't work.">
        <Part label="Error state (replaces a section)">
          <div className="rounded-2xl bg-white p-6 text-center">
            <p className="text-3xl">😕</p>
            <p className="mt-2 text-[17px] font-semibold">We couldn't load this</p>
            <p className="mt-1 text-sm text-mist">Check your connection and try again.</p>
            <Button variant="secondary" className="mt-4">Try again</Button>
          </div>
        </Part>
        <Part label="Empty state (nothing to show yet)">
          <div className="rounded-2xl bg-white p-6 text-center">
            <p className="text-3xl">🍽️</p>
            <p className="mt-2 text-[17px] font-semibold">Nothing here yet</p>
            <p className="mt-1 text-sm text-mist">Say what will appear here, and how to get it.</p>
            <Button className="mt-4">Main action</Button>
          </div>
        </Part>
        <Part label="Loading">
          <div className="space-y-3 rounded-2xl bg-white p-4">
            <div className="h-4 w-2/3 rounded bg-line" /><div className="h-4 w-full rounded bg-line" /><div className="h-4 w-5/6 rounded bg-line" />
            <p className="pt-1 text-sm text-mist">Loading…</p>
          </div>
        </Part>
        <Part label="Form field with an error">
          <div className="space-y-4">
            <Field label="Field label" value="What the customer typed" hint="Optional help text" />
            <Field label="Field label" value="Something invalid" error="Say what is wrong and how to fix it." />
          </div>
        </Part>
      </Group>

      <Group title="Pop-ups" note="Use a pop-up when the customer must decide before carrying on.">
        <Part label="Bottom sheet" width={380}>
          <div className="overflow-hidden rounded-t-3xl bg-white shadow-xl">
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-line" />
            <div className="p-5">
              <p className="text-[17px] font-semibold">Sheet title</p>
              <p className="mt-1 text-sm text-mist">One or two sentences of explanation.</p>
              <div className="mt-4 space-y-2">
                <Button className="w-full">Main action</Button>
                <Button variant="ghost" className="w-full">Not now</Button>
              </div>
            </div>
          </div>
        </Part>
        <Part label="Confirm dialog" width={380}>
          <div className="rounded-3xl bg-white p-6 shadow-xl">
            <p className="text-[17px] font-semibold">Are you sure?</p>
            <p className="mt-1 text-sm text-mist">Say what will happen if they confirm.</p>
            <div className="mt-5 flex gap-2">
              <Button variant="secondary" className="flex-1">Go back</Button>
              <Button className="flex-1">Confirm</Button>
            </div>
          </div>
        </Part>
      </Group>

      <Group title="Lists, choices and progress" note="Change the icon by typing a different emoji.">
        <Part label="List rows" width={380}>
          <div className="overflow-hidden rounded-2xl">
            <Row icon="🧾" title="Row title" sub="Supporting detail" right={<span className="text-mist">›</span>} />
            <Row icon="🛵" title="Row title" sub="Supporting detail" right={<Badge tone="good">On time</Badge>} />
            <Row icon="🔔" title="Setting name" sub="What it does" right={<Toggle on />} />
            <Row icon="📍" title="Setting name" sub="What it does" right={<Toggle on={false} />} />
          </div>
        </Part>
        <Part label="Choice (pick one)" width={360}>
          <div className="space-y-2">
            {['Option one', 'Option two', 'Option three'].map((o, i) => (
              <div key={o} className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3 ${i === 0 ? 'border-ink' : 'border-line'}`}>
                <span className={`h-5 w-5 rounded-full border-2 ${i === 0 ? 'border-ink bg-ink shadow-[inset_0_0_0_3px_white]' : 'border-line'}`} />
                <span className="text-[15px] font-medium">{o}</span>
              </div>
            ))}
          </div>
        </Part>
        <Part label="Progress steps" width={300}><Steps current={1} /></Part>
        <Part label="Status labels" width={300}>
          <div className="flex flex-wrap gap-2">
            <Badge>Neutral</Badge><Badge tone="good">On time</Badge><Badge tone="warn">Running late</Badge><Badge tone="bad">Problem</Badge>
          </div>
        </Part>
        <Part label="Info card" width={360}>
          <div className="rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between"><p className="text-[15px] font-semibold">Card title</p><Badge tone="warn">Label</Badge></div>
            <p className="mt-1 text-sm text-mist">Two lines of detail about this item. Keep it short and specific.</p>
            <div className="mt-3 flex gap-2"><Button variant="secondary" className="px-4 py-2 text-sm">Action</Button></div>
          </div>
        </Part>
      </Group>

      <Group title="Blank screens" note="Start here only if no starter screen is close to what you need.">
        <BlankPhone caption="Blank customer screen">
          <ScreenHeader title="Screen title" onBack={() => {}} />
          <div className="flex-1" />
        </BlankPhone>
        <BlankPhone caption="Blank screen with action bar">
          <ScreenHeader title="Screen title" onBack={() => {}} />
          <div className="flex-1" />
          <div className="border-t border-line bg-white p-4"><Button className="w-full">Main action</Button></div>
        </BlankPhone>
      </Group>
    </div>
  );
}
