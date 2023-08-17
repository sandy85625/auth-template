import React from 'react';

const RefundStatement: React.FC = () => {
  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">REFUND AND RETURN POLICY</h1>

      <Section title="Returns">
  <p>Our policy lasts 7 days. If 7 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.</p>
  <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
  <p>Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.</p>
  
  </Section>
  <Section title='Additional non-returnable items:'>
  <ul>
    <li>Gift cards</li>
    <li>Downloadable software products</li>
    <li>Some health and personal care items</li>
  </ul>
  <p>To complete your return, we require a receipt or proof of purchase.</p>
  <p>Please do not send your purchase back to the manufacturer.</p>
  <p>There are certain situations where only partial refunds are granted:</p>
  <ul>
    <li>Book with obvious signs of use</li>
    <li>CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened</li>
    <li>Any item not in its original condition, is damaged or missing parts for reasons not due to our error</li>
    <li>Any item that is returned more than 7 days after delivery, will not be accepted by us nor will be eligible for any type of refund</li>
  </ul>
  </Section>
  <Section title='Refunds (if applicable)'>
  <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
  <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
  </Section>
  <Section title='Late or missing refunds (if applicable)'>
  <p>If you haven&apos;t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet, please contact us at contact@evoura.in.</p>
  </Section>
  <Section title='Sale items (if applicable)'>
  <p>Only regular priced items may be refunded, unfortunately sale items cannot be refunded.</p>
  </Section>
  <Section title='Exchanges (if applicable)'>
  <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at contact@evoura.in and send your item to: D204, Neeraja Sarovar, Kithaganur, Bengaluru - 560036, India.</p>
  </Section>
  <Section title='Gifts'>
  <p>If the item was marked as a gift when purchased and shipped directly to you, you&apos;ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.</p>
  <p>If the item wasn&apos;t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.</p>
  </Section>
  <Section title='Shipping'>
  <p>To return your product, you should mail your product to: D204, Neeraja Sarovar, Kithaganur, Bengaluru - 560036, India.</p>
  <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
  <p>Depending on where you live, the time it may take for your exchanged product to reach you, may vary.</p>
  <p>If you are shipping an item over 1000 INR, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</p>
</Section>



      <footer className="mt-12 border-t pt-6">
        <p>QUESTIONS AND CONTACT INFORMATION</p>
        <p>If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our Privacy Compliance Officer at <a href="mailto:contact@evoura.in" className="text-blue-500">contact@evoura.in</a> or by mail at Evoura Technologies Private Limited, D204, Neeraja Sarovar, Kithaganur, Bengaluru - 560036, India.</p>
        <address className="mt-4">
          Sandeep K, <br />
          Evoura Technologies Private Limited, <br />
          D204, Neeraja Sarovar, Kithaganur, Bengaluru - 560036, India <br />
          <a href="https://evoura.in" className="text-blue-500">https://evoura.in</a>
        </address>
      </footer>
    </div>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default RefundStatement;