import type {PluginContext, PluginInfo} from '@toast-ui/editor';

export interface PluginOptions {
  preset?: string[];
  groupIndex?: number;
  itemIndex?: number;
}

export default function colorPlugin(
  context: PluginContext,
  options: PluginOptions,
): PluginInfo;
