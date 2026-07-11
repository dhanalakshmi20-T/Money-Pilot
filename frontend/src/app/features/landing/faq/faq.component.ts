import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  activeFaq: number | null = 0;

  faqs = [
    {
      question: 'Is Money Pilot free to use?',
      answer: 'Yes. You can manage your personal finances without any subscription.'
    },
    {
      question: 'Can I track both income and expenses?',
      answer: 'Absolutely. Money Pilot lets you record, edit, and categorize both income and expenses.'
    },
    {
      question: 'Is my financial data secure?',
      answer: 'Yes. We follow secure authentication and modern data protection practices.'
    },
    {
      question: 'Can I set monthly budgets?',
      answer: 'Yes. You can create monthly budgets and monitor your spending progress.'
    },
    {
      question: 'Will I get reports?',
      answer: 'Yes. Money Pilot provides charts, summaries, and monthly financial reports.'
    }
  ];
  
  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? null : index;
  }

}
