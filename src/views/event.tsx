import AuthenticatedPage from "@/layouts/authenticated-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Loading } from "@/components/loader";
import { formatDateTimeLong, isNone, notEmptyJSON } from "@/lib/helper";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import EventProvider, { Event } from "@/context/event-provider";
import hljs from "highlight.js";
import json from 'highlight.js/lib/languages/json';
import CopiableLink from "@/components/copiable-link";
import AppLink from "@/components/app-link";

export { getServerSideProps } from "@/lib/middleware";

hljs.registerLanguage('json', json);


export const EventComponent: React.FC<{ eventId?: string }> = ({ eventId }) => {
  const router = useRouter();
  const { setLoading } = useContext(Loading);
  const { event, loading, loadEvent } = useContext(Event);
  const [data, setData] = useState<string>();
  const { id } = router.query;

  useEffect(() => { setLoading(loading); });
  useEffect(() => { (!isNone(loadEvent) && !loading) && loadEvent((id || eventId) as string); }, [id || eventId]);
  useEffect(() => {
    if (event !== undefined) {
      setData(JSON.stringify(event?.data || {}, null, 2));
    }
  });

  return (
    <>
      {!isNone(event?.id) && <>

        <div className="columns my-1">
          <div className="column is-6">
            <span className="subtitle is-size-7 has-text-weight-semibold">EVENT</span>
            <br />
            <span className="title is-4 mr-2">{event?.type}</span>
          </div>

          <div className="column is-6 pb-0">
            <p className="has-text-right">
              <CopiableLink text={event?.id as string} title="Copy ID" />
            </p>
            {!isNone(eventId) && <p className="has-text-right">
              <AppLink
                href={`/developers/events/${eventId}`} target="blank"
                className="button is-default has-text-info is-small mx-1">
                <span className="icon">
                  <i className="fas fa-external-link-alt"></i>
                </span>
              </AppLink>
            </p>}
          </div>
        </div>

        <hr className="mt-1 mb-2" style={{ height: '1px' }} />

        <div className="columns mb-4">
          <div className="p-4 mr-4">
            <span className="subtitle is-size-7 my-4">Date</span><br />
            <span className="subtitle is-size-7 has-text-weight-semibold">{formatDateTimeLong(event?.created_at)}</span>
          </div>

          <div className="my-2" style={{ width: '1px', backgroundColor: '#ddd' }}></div>

          <div className="p-4 mr-4">
            <span className="subtitle is-size-7 my-4">Source</span><br />
            <span className="subtitle is-size-7 has-text-weight-semibold">Automatic</span>
          </div>
        </div>

        <h2 className="title is-5 my-4">Event data</h2>
        <hr className="mt-1 mb-2" style={{ height: '1px' }} />

        {notEmptyJSON(data) &&
          <div className="py-3">
            <pre className="code p-1">
              <code
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight(data as string, { language: 'json' }).value,
                }}
              />
            </pre>
          </div>}

      </>}
    </>
  );
};


export default function EventPage(pageProps: any) {
  return AuthenticatedPage((
    <DashboardLayout>
      <Head><title>Event - {(pageProps as any).metadata?.APP_NAME}</title></Head>
      <EventProvider>
        <EventComponent />
      </EventProvider>
    </DashboardLayout>
  ), pageProps);
}
