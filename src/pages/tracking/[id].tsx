import { References, TrackingEvent, TrackingStatus } from "@/api";
import { NextPage } from "next";
import Image from 'next/image';
import Head from "next/head";
import React from "react";
import { isNone } from "@/lib/helper";

export { getServerSideProps } from '@/lib/static/tracker';

type DayEvents = { [k: string]: TrackingEvent[] };

const Tracking: NextPage<{ id: string, references: References, tracker?: TrackingStatus, message?: string }> = ({ references, id, tracker, message }) => {
  const { app_name, app_website } = references || {};

  const computeEvents = (tracker: TrackingStatus): DayEvents => {
    return (tracker?.events || []).reduce((days, event: TrackingEvent) => {
      const daydate = new Date(event.date as string).toUTCString().split(' ').slice(0, 4).join(' ');
      return { ...days, [daydate]: [...(days[daydate] || []), event] };
    }, {} as DayEvents);
  };

  return (
    <>
      <Head><title>Tracking - {tracker?.tracking_number || id} - {app_name}</title></Head>

      <section className="hero is-fullheight p-2">

        <div className="container">

          <div className="has-text-centered my-6">
            <Image src="/logo.svg" width="100" height="100" alt={app_name} />
          </div>

          {!isNone(tracker) && <>
            <div className="card isolated-card">
              <div className="card-content">

                <div className="has-text-centered pb-4">
                  <Image src={`/carriers/${tracker?.carrier_name}_icon.svg`} width={60} height={60} alt={tracker?.carrier_name} />
                </div>


                <div className="subtitle has-text-centered is-6">
                  <p><span>Tracking ID</span> <strong>{tracker?.tracking_number}</strong></p>
                </div>

              </div>

              <footer className="card-footer">

                {(tracker?.status === 'delivered') &&
                  <p className="card-footer-item has-background-success has-text-white is-size-4">Delivered</p>}

                {(tracker?.status === 'in-transit') &&
                  <p className="card-footer-item has-background-info has-text-white is-size-4">In-Transit</p>}

                {(tracker?.status !== 'delivered' && tracker?.status !== 'in-transit') &&
                  <p className="card-footer-item has-background-grey-dark has-text-white is-size-4">Pending</p>}

              </footer>

            </div>

            <hr />

            <div className="my-6">

              <aside className="menu">
                <ul className="menu-list mb-5" style={{ maxWidth: '28rem' }}>
                  {Object.entries(computeEvents(tracker as TrackingStatus)).map(([day, events], index) => <li key={index}>

                    <p className="menu-label is-size-6 is-capitalized">{day}</p>

                    {events.map((event, index) => <ul key={index}>
                      <li className="my-2">
                        <code>{event.time}</code>
                        <span className="is-subtitle is-size-7 my-1 has-text-weight-semibold">{event.location}</span>
                      </li>
                      <li className="my-2">
                        <span className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">{event.description}</span>
                      </li>
                    </ul>)}

                  </li>)}
                </ul>
              </aside>

            </div>

          </>}

          {!isNone(message) && <div className="card isolated-card my-6">
            <div className="card-content has-text-centered ">
              <p>{message}</p>
            </div>
          </div>}

        </div>

        <hr className="mt-4" />

        <div className="hero-footer mb-4">
          <div className="content has-text-centered">
            <p>
              <a href={app_website} className="button is-white">Powered by &copy; {app_name}</a>
            </p>
          </div>
        </div>

      </section>
    </>
  )
};

export default Tracking;
